import { genUploader } from "uploadthing/client";
const ut = genUploader({
  url: "/api/uploadthing",
  package: "nexus-auis"
});
window.uploadFiles = ut.uploadFiles;

