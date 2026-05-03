require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const cors = require("cors");
const Pusher = require("pusher");
const fs = require("fs");
const path = require("path");

// ─── UPLOADTHING CONFIG ────────────────────────────────────────────────────────
const { UTApi } = require("uploadthing/server");
const { createUploadthing, createRouteHandler } = require("uploadthing/express");



// UploadThing


const app = express();
const utapi = process.env.UPLOADTHING_TOKEN ? new UTApi({ token: process.env.UPLOADTHING_TOKEN }) : null;
if (!utapi) console.warn("⚠️ Warning: UPLOADTHING_TOKEN is missing. Uploads will fail.");



const f = createUploadthing();
const uploadRouter = {
  materialUploader: f({ 
    image: { maxFileSize: "16MB", maxFileCount: 1 },
    pdf: { maxFileSize: "16MB", maxFileCount: 1 },
    text: { maxFileSize: "16MB", maxFileCount: 1 },
    video: { maxFileSize: "16MB", maxFileCount: 1 },
    audio: { maxFileSize: "16MB", maxFileCount: 1 },
    blob: { maxFileSize: "16MB", maxFileCount: 1 }
  })
    .middleware(async ({ req }) => { return { uploadedBy: "user" }; })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete:", file.url);
    }),
};

app.use("/api/uploadthing", createRouteHandler({
  router: uploadRouter,
  config: { token: process.env.UPLOADTHING_TOKEN }
}));

// ─── PUSHER CONFIG ───────────────────────────────────────────────────────────
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID || "1792621",
  key: process.env.PUSHER_KEY || "c13e5901d85bfa53ba80",
  secret: process.env.PUSHER_SECRET || "7e504153ca258673f8a4",
  cluster: process.env.PUSHER_CLUSTER || "mt1",
  useTLS: true
});

async function safeTrigger(channel, event, data) {
  try {
    await pusher.trigger(channel, event, data);
  } catch (err) {
    console.error("Pusher Trigger Error:", err.message);
  }
}


// ─── CONFIG ───────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://nexus:nexus123@cluster0.p7rnx.mongodb.net/nexus?retryWrites=true&w=majority"; 
const JWT_SECRET = process.env.JWT_SECRET || "nexus_auis_secret_2025";

// ─── MIDDLEWARE ───────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from public
app.use(express.static(path.join(__dirname, 'public')));

// ─── MONGODB CONNECTION ───────────────────────────────────────────────────────
let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  try {
    await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 5000, family: 4 });
    isConnected = true;
    console.log("✅ MongoDB connected");
  } catch (err) { console.error("❌ MongoDB error:", err); }
};

app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// ─── SCHEMAS & MODELS ─────────────────────────────────────────────────────────
const User = mongoose.models.User || mongoose.model("User", new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  major: { type: String, default: "Other" },
  bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Material" }],
  createdAt: { type: Date, default: Date.now }
}));

const Material = mongoose.models.Material || mongoose.model("Material", new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  type: String, // assignment, homework, project, essay
  major: String,
  fileUrl: String, // From UploadThing
  fileKey: String, // To delete from UploadThing
  originalName: String,
  mimetype: String,
  size: Number,
  uploader: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  ratings: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, value: { type: Number, min: 1, max: 5 } }],
  comments: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  }],
  downloadCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
}));

const Message = mongoose.models.Message || mongoose.model("Message", new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  userName: String,
  major: String,
  text: { type: String, required: true },
  room: { type: String, default: "general" },
  createdAt: { type: Date, default: Date.now }
}));

// ─── FILE UPLOAD (Local -> UploadThing) ───────────────────────────────────────
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) { cb(null, uploadDir) },
  filename: function (req, file, cb) { cb(null, Date.now() + '-' + file.originalname) }
});
const upload = multer({ storage: storage });

// ─── AUTH MIDDLEWARE ──────────────────────────────────────────────────────────
const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token" });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch { res.status(401).json({ error: "Invalid token" }); }
};

// ─── ROUTES ───────────────────────────────────────────────────────────────────

// Auth
app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password, major } = req.body;
    const hashed = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email, password: hashed, major });
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });
    res.status(201).json({ token, user: { id: user._id, name, email, major } });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !await bcrypt.compare(password, user.password)) return res.status(401).json({ error: "Invalid login" });
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, user: { id: user._id, name: user.name, email, major: user.major } });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("name email major");
    res.json({ user });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Materials
app.post("/api/materials", authMiddleware, async (req, res) => {
  try {
    const { title, description, type, major, fileUrl, fileKey, originalName, mimetype, size } = req.body;
    if (!fileUrl) return res.status(400).json({ error: "Missing fileUrl" });

    const material = await Material.create({
      title,
      description: description || "",
      type: type || "Note",
      major: major || req.user.major,
      fileUrl: fileUrl,
      fileKey: fileKey,
      originalName: originalName,
      mimetype: mimetype,
      size: size,
      uploader: req.user._id
    });
    
    // Notify users
    safeTrigger("general", "new-material", { title: material.title, major: material.major });


    res.status(201).json({ material });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get("/api/materials", async (req, res) => {
  try {
    const { search, major, type, sort } = req.query;
    let query = {};
    if (search) query.title = { $regex: search, $options: "i" };
    if (major && major !== "All") {
      const majorVariations = [major];
      if (major === "Software Engineering") majorVariations.push("SE");
      if (major === "Information Technology (IT)") majorVariations.push("IT");
      if (major === "Computer Science") majorVariations.push("CS");
      if (major === "Business Administration") majorVariations.push("Business");
      query.major = { $in: majorVariations };
    }

    if (type && type !== "All") {
      const typeVariations = [type];
      if (type === "Note / Summary") typeVariations.push("Note");
      if (type === "Textbook") typeVariations.push("Book");
      query.type = { $in: typeVariations };
    }

    const sortOption = sort === "oldest" ? { createdAt: 1 } : { createdAt: -1 };
    const materials = await Material.find(query)
      .populate("uploader", "name email major")
      .populate("comments.user", "name email major")
      .sort(sortOption);

    res.json({ materials });
  } catch(err) { res.status(500).json({ error: err.message }); }
});

app.get("/api/materials/:id", async (req, res) => {
  try {
    const material = await Material.findById(req.params.id)
      .populate("uploader", "name email major")
      .populate("comments.user", "name email major");

    if (!material) return res.status(404).json({ error: "Material not found" });
    res.json({ material });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.put("/api/materials/:id", authMiddleware, async (req, res) => {
  try {
    const material = await Material.findById(req.params.id);
    if (!material) return res.status(404).json({ error: "Material not found" });
    if (material.uploader.toString() !== req.user._id.toString()) return res.status(403).json({ error: "Unauthorized" });

    material.title = req.body.title || material.title;
    material.description = req.body.description !== undefined ? req.body.description : material.description;
    material.type = req.body.type || material.type;
    material.major = req.body.major || material.major;
    
    await material.save();
    res.json({ material });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.delete("/api/materials/:id", authMiddleware, async (req, res) => {
  try {
    const material = await Material.findById(req.params.id);
    if (!material) return res.status(404).json({ error: "Material not found" });
    if (material.uploader.toString() !== req.user._id.toString()) return res.status(403).json({ error: "Unauthorized" });

    // Delete from UploadThing
    if (material.fileKey) {
      await utapi.deleteFiles(material.fileKey);
    }

    await Material.findByIdAndDelete(req.params.id);
    
    // Also remove from bookmarks of all users
    await User.updateMany({ bookmarks: req.params.id }, { $pull: { bookmarks: req.params.id } });

    res.json({ message: "Material deleted" });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post("/api/materials/:id/download", async (req, res) => {
  try {
    const material = await Material.findByIdAndUpdate(req.params.id, { $inc: { downloadCount: 1 } }, { new: true });
    res.json({ downloadCount: material.downloadCount });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post("/api/materials/:id/comments", authMiddleware, async (req, res) => {
  try {
    const material = await Material.findById(req.params.id).populate("uploader", "name email major");

    if (!material) return res.status(404).json({ error: "Material not found" });

    const newComment = {
      user: req.user._id,
      text: req.body.text,
      createdAt: new Date()
    };
    material.comments.push(newComment);
    await material.save();
    
    // We populate the user details for the response
    const populatedMaterial = await Material.findById(material._id)
      .populate("uploader", "name email major")
      .populate("comments.user", "name email major");

    
    safeTrigger("general", "new-comment", { 
      materialId: material._id, 
      materialTitle: material.title,
      uploaderId: material.uploader._id 
    });

    
    res.json({ message: "Comment added", material: populatedMaterial });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Rating & Bookmark logic
app.post("/api/materials/:id/rate", authMiddleware, async (req, res) => {
  try {
    const material = await Material.findById(req.params.id);
    
    // Check if user already rated
    const existingRatingIdx = material.ratings.findIndex(r => r.user.toString() === req.user._id.toString());
    if (existingRatingIdx > -1) {
      material.ratings[existingRatingIdx].value = req.body.value;
    } else {
      material.ratings.push({ user: req.user._id, value: req.body.value });
    }
    
    await material.save();
    res.json({ message: "Rated!", ratings: material.ratings });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post("/api/bookmarks/:id", authMiddleware, async (req, res) => {
  try {
    const idx = req.user.bookmarks.indexOf(req.params.id);
    if (idx > -1) req.user.bookmarks.splice(idx, 1);
    else req.user.bookmarks.push(req.params.id);
    await req.user.save();
    res.json({ bookmarks: req.user.bookmarks });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get("/api/bookmarks", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: "bookmarks",
      populate: { path: "uploader", select: "name email" }
    });
    res.json({ bookmarks: user.bookmarks });
  } catch (err) { res.status(500).json({ error: err.message }); }
});



// For Vercel Serverless Function export
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}

module.exports = app;