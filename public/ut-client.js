(() => {
  // node_modules/uploadthing/dist/package-DpScpvTA.js
  var version = "7.7.4";

  // node_modules/effect/dist/esm/Function.js
  var isFunction = (input) => typeof input === "function";
  var dual = function(arity, body) {
    if (typeof arity === "function") {
      return function() {
        if (arity(arguments)) {
          return body.apply(this, arguments);
        }
        return (self) => body(self, ...arguments);
      };
    }
    switch (arity) {
      case 0:
      case 1:
        throw new RangeError(`Invalid arity ${arity}`);
      case 2:
        return function(a, b) {
          if (arguments.length >= 2) {
            return body(a, b);
          }
          return function(self) {
            return body(self, a);
          };
        };
      case 3:
        return function(a, b, c) {
          if (arguments.length >= 3) {
            return body(a, b, c);
          }
          return function(self) {
            return body(self, a, b);
          };
        };
      case 4:
        return function(a, b, c, d) {
          if (arguments.length >= 4) {
            return body(a, b, c, d);
          }
          return function(self) {
            return body(self, a, b, c);
          };
        };
      case 5:
        return function(a, b, c, d, e) {
          if (arguments.length >= 5) {
            return body(a, b, c, d, e);
          }
          return function(self) {
            return body(self, a, b, c, d);
          };
        };
      default:
        return function() {
          if (arguments.length >= arity) {
            return body.apply(this, arguments);
          }
          const args2 = arguments;
          return function(self) {
            return body(self, ...args2);
          };
        };
    }
  };
  var identity = (a) => a;
  var unsafeCoerce = identity;
  var constant = (value) => () => value;
  var constUndefined = /* @__PURE__ */ constant(void 0);
  var constVoid = constUndefined;
  function pipe(a, ab, bc, cd, de, ef, fg, gh, hi) {
    switch (arguments.length) {
      case 1:
        return a;
      case 2:
        return ab(a);
      case 3:
        return bc(ab(a));
      case 4:
        return cd(bc(ab(a)));
      case 5:
        return de(cd(bc(ab(a))));
      case 6:
        return ef(de(cd(bc(ab(a)))));
      case 7:
        return fg(ef(de(cd(bc(ab(a))))));
      case 8:
        return gh(fg(ef(de(cd(bc(ab(a)))))));
      case 9:
        return hi(gh(fg(ef(de(cd(bc(ab(a))))))));
      default: {
        let ret = arguments[0];
        for (let i = 1; i < arguments.length; i++) {
          ret = arguments[i](ret);
        }
        return ret;
      }
    }
  }

  // node_modules/effect/dist/esm/GlobalValue.js
  var globalStoreId = `effect/GlobalValue`;
  var globalStore;
  var globalValue = (id, compute) => {
    if (!globalStore) {
      globalThis[globalStoreId] ??= /* @__PURE__ */ new Map();
      globalStore = globalThis[globalStoreId];
    }
    if (!globalStore.has(id)) {
      globalStore.set(id, compute());
    }
    return globalStore.get(id);
  };

  // node_modules/effect/dist/esm/Predicate.js
  var isString = (input) => typeof input === "string";
  var isNumber = (input) => typeof input === "number";
  var isFunction2 = isFunction;
  var isRecordOrArray = (input) => typeof input === "object" && input !== null;
  var isObject = (input) => isRecordOrArray(input) || isFunction2(input);
  var hasProperty = /* @__PURE__ */ dual(2, (self, property) => isObject(self) && property in self);
  var isTagged = /* @__PURE__ */ dual(2, (self, tag) => hasProperty(self, "_tag") && self["_tag"] === tag);
  var isRecord = (input) => isRecordOrArray(input) && !Array.isArray(input);

  // node_modules/effect/dist/esm/internal/errors.js
  var getBugErrorMessage = (message) => `BUG: ${message} - please report an issue at https://github.com/Effect-TS/effect/issues`;

  // node_modules/effect/dist/esm/Utils.js
  var GenKindTypeId = /* @__PURE__ */ Symbol.for("effect/Gen/GenKind");
  var GenKindImpl = class {
    value;
    constructor(value) {
      this.value = value;
    }
    /**
     * @since 2.0.0
     */
    get _F() {
      return identity;
    }
    /**
     * @since 2.0.0
     */
    get _R() {
      return (_) => _;
    }
    /**
     * @since 2.0.0
     */
    get _O() {
      return (_) => _;
    }
    /**
     * @since 2.0.0
     */
    get _E() {
      return (_) => _;
    }
    /**
     * @since 2.0.0
     */
    [GenKindTypeId] = GenKindTypeId;
    /**
     * @since 2.0.0
     */
    [Symbol.iterator]() {
      return new SingleShotGen(this);
    }
  };
  var SingleShotGen = class _SingleShotGen {
    self;
    called = false;
    constructor(self) {
      this.self = self;
    }
    /**
     * @since 2.0.0
     */
    next(a) {
      return this.called ? {
        value: a,
        done: true
      } : (this.called = true, {
        value: this.self,
        done: false
      });
    }
    /**
     * @since 2.0.0
     */
    return(a) {
      return {
        value: a,
        done: true
      };
    }
    /**
     * @since 2.0.0
     */
    throw(e) {
      throw e;
    }
    /**
     * @since 2.0.0
     */
    [Symbol.iterator]() {
      return new _SingleShotGen(this.self);
    }
  };
  var MUL_HI = 1481765933 >>> 0;
  var MUL_LO = 1284865837 >>> 0;
  var YieldWrapTypeId = /* @__PURE__ */ Symbol.for("effect/Utils/YieldWrap");
  var YieldWrap = class {
    /**
     * @since 3.0.6
     */
    #value;
    constructor(value) {
      this.#value = value;
    }
    /**
     * @since 3.0.6
     */
    [YieldWrapTypeId]() {
      return this.#value;
    }
  };
  function yieldWrapGet(self) {
    if (typeof self === "object" && self !== null && YieldWrapTypeId in self) {
      return self[YieldWrapTypeId]();
    }
    throw new Error(getBugErrorMessage("yieldWrapGet"));
  }
  var structuralRegionState = /* @__PURE__ */ globalValue("effect/Utils/isStructuralRegion", () => ({
    enabled: false,
    tester: void 0
  }));
  var standard = {
    effect_internal_function: (body) => {
      return body();
    }
  };
  var forced = {
    effect_internal_function: (body) => {
      try {
        return body();
      } finally {
      }
    }
  };
  var isNotOptimizedAway = /* @__PURE__ */ standard.effect_internal_function(() => new Error().stack)?.includes("effect_internal_function") === true;
  var internalCall = isNotOptimizedAway ? standard.effect_internal_function : forced.effect_internal_function;
  var genConstructor = function* () {
  }.constructor;

  // node_modules/effect/dist/esm/Hash.js
  var randomHashCache = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/Hash/randomHashCache"), () => /* @__PURE__ */ new WeakMap());
  var symbol = /* @__PURE__ */ Symbol.for("effect/Hash");
  var hash = (self) => {
    if (structuralRegionState.enabled === true) {
      return 0;
    }
    switch (typeof self) {
      case "number":
        return number(self);
      case "bigint":
        return string(self.toString(10));
      case "boolean":
        return string(String(self));
      case "symbol":
        return string(String(self));
      case "string":
        return string(self);
      case "undefined":
        return string("undefined");
      case "function":
      case "object": {
        if (self === null) {
          return string("null");
        } else if (self instanceof Date) {
          return hash(self.toISOString());
        } else if (self instanceof URL) {
          return hash(self.href);
        } else if (isHash(self)) {
          return self[symbol]();
        } else {
          return random(self);
        }
      }
      default:
        throw new Error(`BUG: unhandled typeof ${typeof self} - please report an issue at https://github.com/Effect-TS/effect/issues`);
    }
  };
  var random = (self) => {
    if (!randomHashCache.has(self)) {
      randomHashCache.set(self, number(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)));
    }
    return randomHashCache.get(self);
  };
  var combine = (b) => (self) => self * 53 ^ b;
  var optimize = (n) => n & 3221225471 | n >>> 1 & 1073741824;
  var isHash = (u) => hasProperty(u, symbol);
  var number = (n) => {
    if (n !== n || n === Infinity) {
      return 0;
    }
    let h = n | 0;
    if (h !== n) {
      h ^= n * 4294967295;
    }
    while (n > 4294967295) {
      h ^= n /= 4294967295;
    }
    return optimize(h);
  };
  var string = (str) => {
    let h = 5381, i = str.length;
    while (i) {
      h = h * 33 ^ str.charCodeAt(--i);
    }
    return optimize(h);
  };
  var structureKeys = (o, keys) => {
    let h = 12289;
    for (let i = 0; i < keys.length; i++) {
      h ^= pipe(string(keys[i]), combine(hash(o[keys[i]])));
    }
    return optimize(h);
  };
  var structure = (o) => structureKeys(o, Object.keys(o));
  var cached = function() {
    if (arguments.length === 1) {
      const self2 = arguments[0];
      return function(hash3) {
        Object.defineProperty(self2, symbol, {
          value() {
            return hash3;
          },
          enumerable: false
        });
        return hash3;
      };
    }
    const self = arguments[0];
    const hash2 = arguments[1];
    Object.defineProperty(self, symbol, {
      value() {
        return hash2;
      },
      enumerable: false
    });
    return hash2;
  };

  // node_modules/effect/dist/esm/Equal.js
  var symbol2 = /* @__PURE__ */ Symbol.for("effect/Equal");
  function equals() {
    if (arguments.length === 1) {
      return (self) => compareBoth(self, arguments[0]);
    }
    return compareBoth(arguments[0], arguments[1]);
  }
  function compareBoth(self, that) {
    if (self === that) {
      return true;
    }
    const selfType = typeof self;
    if (selfType !== typeof that) {
      return false;
    }
    if (selfType === "object" || selfType === "function") {
      if (self !== null && that !== null) {
        if (isEqual(self) && isEqual(that)) {
          if (hash(self) === hash(that) && self[symbol2](that)) {
            return true;
          } else {
            return structuralRegionState.enabled && structuralRegionState.tester ? structuralRegionState.tester(self, that) : false;
          }
        } else if (self instanceof Date && that instanceof Date) {
          return self.toISOString() === that.toISOString();
        } else if (self instanceof URL && that instanceof URL) {
          return self.href === that.href;
        }
      }
      if (structuralRegionState.enabled) {
        if (Array.isArray(self) && Array.isArray(that)) {
          return self.length === that.length && self.every((v, i) => compareBoth(v, that[i]));
        }
        if (Object.getPrototypeOf(self) === Object.prototype && Object.getPrototypeOf(self) === Object.prototype) {
          const keysSelf = Object.keys(self);
          const keysThat = Object.keys(that);
          if (keysSelf.length === keysThat.length) {
            for (const key of keysSelf) {
              if (!(key in that && compareBoth(self[key], that[key]))) {
                return structuralRegionState.tester ? structuralRegionState.tester(self, that) : false;
              }
            }
            return true;
          }
        }
        return structuralRegionState.tester ? structuralRegionState.tester(self, that) : false;
      }
    }
    return structuralRegionState.enabled && structuralRegionState.tester ? structuralRegionState.tester(self, that) : false;
  }
  var isEqual = (u) => hasProperty(u, symbol2);

  // node_modules/effect/dist/esm/Inspectable.js
  var NodeInspectSymbol = /* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom");
  var toJSON = (x) => {
    try {
      if (hasProperty(x, "toJSON") && isFunction2(x["toJSON"]) && x["toJSON"].length === 0) {
        return x.toJSON();
      } else if (Array.isArray(x)) {
        return x.map(toJSON);
      }
    } catch {
      return {};
    }
    return redact(x);
  };
  var format = (x) => JSON.stringify(x, null, 2);
  var BaseProto = {
    toJSON() {
      return toJSON(this);
    },
    [NodeInspectSymbol]() {
      return this.toJSON();
    },
    toString() {
      return format(this.toJSON());
    }
  };
  var Class = class {
    /**
     * @since 2.0.0
     */
    [NodeInspectSymbol]() {
      return this.toJSON();
    }
    /**
     * @since 2.0.0
     */
    toString() {
      return format(this.toJSON());
    }
  };
  var toStringUnknown = (u, whitespace = 2) => {
    if (typeof u === "string") {
      return u;
    }
    try {
      return typeof u === "object" ? stringifyCircular(u, whitespace) : String(u);
    } catch {
      return String(u);
    }
  };
  var stringifyCircular = (obj, whitespace) => {
    let cache = [];
    const retVal = JSON.stringify(obj, (_key, value) => typeof value === "object" && value !== null ? cache.includes(value) ? void 0 : cache.push(value) && (redactableState.fiberRefs !== void 0 && isRedactable(value) ? value[symbolRedactable](redactableState.fiberRefs) : value) : value, whitespace);
    cache = void 0;
    return retVal;
  };
  var symbolRedactable = /* @__PURE__ */ Symbol.for("effect/Inspectable/Redactable");
  var isRedactable = (u) => typeof u === "object" && u !== null && symbolRedactable in u;
  var redactableState = /* @__PURE__ */ globalValue("effect/Inspectable/redactableState", () => ({
    fiberRefs: void 0
  }));
  var redact = (u) => {
    if (isRedactable(u) && redactableState.fiberRefs !== void 0) {
      return u[symbolRedactable](redactableState.fiberRefs);
    }
    return u;
  };

  // node_modules/effect/dist/esm/Pipeable.js
  var pipeArguments = (self, args2) => {
    switch (args2.length) {
      case 0:
        return self;
      case 1:
        return args2[0](self);
      case 2:
        return args2[1](args2[0](self));
      case 3:
        return args2[2](args2[1](args2[0](self)));
      case 4:
        return args2[3](args2[2](args2[1](args2[0](self))));
      case 5:
        return args2[4](args2[3](args2[2](args2[1](args2[0](self)))));
      case 6:
        return args2[5](args2[4](args2[3](args2[2](args2[1](args2[0](self))))));
      case 7:
        return args2[6](args2[5](args2[4](args2[3](args2[2](args2[1](args2[0](self)))))));
      case 8:
        return args2[7](args2[6](args2[5](args2[4](args2[3](args2[2](args2[1](args2[0](self))))))));
      case 9:
        return args2[8](args2[7](args2[6](args2[5](args2[4](args2[3](args2[2](args2[1](args2[0](self)))))))));
      default: {
        let ret = self;
        for (let i = 0, len = args2.length; i < len; i++) {
          ret = args2[i](ret);
        }
        return ret;
      }
    }
  };

  // node_modules/effect/dist/esm/internal/opCodes/effect.js
  var OP_COMMIT = "Commit";

  // node_modules/effect/dist/esm/internal/version.js
  var moduleVersion = "3.17.7";
  var getCurrentVersion = () => moduleVersion;

  // node_modules/effect/dist/esm/internal/effectable.js
  var EffectTypeId = /* @__PURE__ */ Symbol.for("effect/Effect");
  var StreamTypeId = /* @__PURE__ */ Symbol.for("effect/Stream");
  var SinkTypeId = /* @__PURE__ */ Symbol.for("effect/Sink");
  var ChannelTypeId = /* @__PURE__ */ Symbol.for("effect/Channel");
  var effectVariance = {
    /* c8 ignore next */
    _R: (_) => _,
    /* c8 ignore next */
    _E: (_) => _,
    /* c8 ignore next */
    _A: (_) => _,
    _V: /* @__PURE__ */ getCurrentVersion()
  };
  var sinkVariance = {
    /* c8 ignore next */
    _A: (_) => _,
    /* c8 ignore next */
    _In: (_) => _,
    /* c8 ignore next */
    _L: (_) => _,
    /* c8 ignore next */
    _E: (_) => _,
    /* c8 ignore next */
    _R: (_) => _
  };
  var channelVariance = {
    /* c8 ignore next */
    _Env: (_) => _,
    /* c8 ignore next */
    _InErr: (_) => _,
    /* c8 ignore next */
    _InElem: (_) => _,
    /* c8 ignore next */
    _InDone: (_) => _,
    /* c8 ignore next */
    _OutErr: (_) => _,
    /* c8 ignore next */
    _OutElem: (_) => _,
    /* c8 ignore next */
    _OutDone: (_) => _
  };
  var EffectPrototype = {
    [EffectTypeId]: effectVariance,
    [StreamTypeId]: effectVariance,
    [SinkTypeId]: sinkVariance,
    [ChannelTypeId]: channelVariance,
    [symbol2](that) {
      return this === that;
    },
    [symbol]() {
      return cached(this, random(this));
    },
    [Symbol.iterator]() {
      return new SingleShotGen(new YieldWrap(this));
    },
    pipe() {
      return pipeArguments(this, arguments);
    }
  };
  var StructuralPrototype = {
    [symbol]() {
      return cached(this, structure(this));
    },
    [symbol2](that) {
      const selfKeys = Object.keys(this);
      const thatKeys = Object.keys(that);
      if (selfKeys.length !== thatKeys.length) {
        return false;
      }
      for (const key of selfKeys) {
        if (!(key in that && equals(this[key], that[key]))) {
          return false;
        }
      }
      return true;
    }
  };
  var CommitPrototype = {
    ...EffectPrototype,
    _op: OP_COMMIT
  };
  var StructuralCommitPrototype = {
    ...CommitPrototype,
    ...StructuralPrototype
  };

  // node_modules/effect/dist/esm/Array.js
  var fromIterable = (collection) => Array.isArray(collection) ? collection : Array.from(collection);
  var ensure = (self) => Array.isArray(self) ? self : [self];

  // node_modules/effect/dist/esm/internal/context.js
  var TagTypeId = /* @__PURE__ */ Symbol.for("effect/Context/Tag");
  var ReferenceTypeId = /* @__PURE__ */ Symbol.for("effect/Context/Reference");
  var STMSymbolKey = "effect/STM";
  var STMTypeId = /* @__PURE__ */ Symbol.for(STMSymbolKey);
  var TagProto = {
    ...EffectPrototype,
    _op: "Tag",
    [STMTypeId]: effectVariance,
    [TagTypeId]: {
      _Service: (_) => _,
      _Identifier: (_) => _
    },
    toString() {
      return format(this.toJSON());
    },
    toJSON() {
      return {
        _id: "Tag",
        key: this.key,
        stack: this.stack
      };
    },
    [NodeInspectSymbol]() {
      return this.toJSON();
    },
    of(self) {
      return self;
    },
    context(self) {
      return make(this, self);
    }
  };
  var ReferenceProto = {
    ...TagProto,
    [ReferenceTypeId]: ReferenceTypeId
  };
  var Tag = (id) => () => {
    const limit = Error.stackTraceLimit;
    Error.stackTraceLimit = 2;
    const creationError = new Error();
    Error.stackTraceLimit = limit;
    function TagClass() {
    }
    Object.setPrototypeOf(TagClass, TagProto);
    TagClass.key = id;
    Object.defineProperty(TagClass, "stack", {
      get() {
        return creationError.stack;
      }
    });
    return TagClass;
  };
  var Reference = () => (id, options) => {
    const limit = Error.stackTraceLimit;
    Error.stackTraceLimit = 2;
    const creationError = new Error();
    Error.stackTraceLimit = limit;
    function ReferenceClass() {
    }
    Object.setPrototypeOf(ReferenceClass, ReferenceProto);
    ReferenceClass.key = id;
    ReferenceClass.defaultValue = options.defaultValue;
    Object.defineProperty(ReferenceClass, "stack", {
      get() {
        return creationError.stack;
      }
    });
    return ReferenceClass;
  };
  var TypeId = /* @__PURE__ */ Symbol.for("effect/Context");
  var ContextProto = {
    [TypeId]: {
      _Services: (_) => _
    },
    [symbol2](that) {
      if (isContext(that)) {
        if (this.unsafeMap.size === that.unsafeMap.size) {
          for (const k of this.unsafeMap.keys()) {
            if (!that.unsafeMap.has(k) || !equals(this.unsafeMap.get(k), that.unsafeMap.get(k))) {
              return false;
            }
          }
          return true;
        }
      }
      return false;
    },
    [symbol]() {
      return cached(this, number(this.unsafeMap.size));
    },
    pipe() {
      return pipeArguments(this, arguments);
    },
    toString() {
      return format(this.toJSON());
    },
    toJSON() {
      return {
        _id: "Context",
        services: Array.from(this.unsafeMap).map(toJSON)
      };
    },
    [NodeInspectSymbol]() {
      return this.toJSON();
    }
  };
  var makeContext = (unsafeMap) => {
    const context = Object.create(ContextProto);
    context.unsafeMap = unsafeMap;
    return context;
  };
  var serviceNotFoundError = (tag) => {
    const error = new Error(`Service not found${tag.key ? `: ${String(tag.key)}` : ""}`);
    if (tag.stack) {
      const lines = tag.stack.split("\n");
      if (lines.length > 2) {
        const afterAt = lines[2].match(/at (.*)/);
        if (afterAt) {
          error.message = error.message + ` (defined at ${afterAt[1]})`;
        }
      }
    }
    if (error.stack) {
      const lines = error.stack.split("\n");
      lines.splice(1, 3);
      error.stack = lines.join("\n");
    }
    return error;
  };
  var isContext = (u) => hasProperty(u, TypeId);
  var make = (tag, service2) => makeContext(/* @__PURE__ */ new Map([[tag.key, service2]]));
  var add = /* @__PURE__ */ dual(3, (self, tag, service2) => {
    const map2 = new Map(self.unsafeMap);
    map2.set(tag.key, service2);
    return makeContext(map2);
  });
  var defaultValueCache = /* @__PURE__ */ globalValue("effect/Context/defaultValueCache", () => /* @__PURE__ */ new Map());
  var getDefaultValue = (tag) => {
    if (defaultValueCache.has(tag.key)) {
      return defaultValueCache.get(tag.key);
    }
    const value = tag.defaultValue();
    defaultValueCache.set(tag.key, value);
    return value;
  };
  var unsafeGetReference = (self, tag) => {
    return self.unsafeMap.has(tag.key) ? self.unsafeMap.get(tag.key) : getDefaultValue(tag);
  };
  var unsafeGet = /* @__PURE__ */ dual(2, (self, tag) => {
    if (!self.unsafeMap.has(tag.key)) {
      if (ReferenceTypeId in tag) return getDefaultValue(tag);
      throw serviceNotFoundError(tag);
    }
    return self.unsafeMap.get(tag.key);
  });

  // node_modules/effect/dist/esm/Context.js
  var add2 = add;
  var unsafeGet2 = unsafeGet;
  var Tag2 = Tag;
  var Reference2 = Reference;

  // node_modules/effect/dist/esm/Effectable.js
  var EffectPrototype2 = EffectPrototype;

  // node_modules/effect/dist/esm/Micro.js
  var TypeId2 = /* @__PURE__ */ Symbol.for("effect/Micro");
  var MicroExitTypeId = /* @__PURE__ */ Symbol.for("effect/Micro/MicroExit");
  var isMicro = (u) => typeof u === "object" && u !== null && TypeId2 in u;
  var MicroCauseTypeId = /* @__PURE__ */ Symbol.for("effect/Micro/MicroCause");
  var microCauseVariance = {
    _E: identity
  };
  var MicroCauseImpl = class extends globalThis.Error {
    _tag;
    traces;
    [MicroCauseTypeId];
    constructor(_tag, originalError, traces) {
      const causeName = `MicroCause.${_tag}`;
      let name;
      let message;
      let stack;
      if (originalError instanceof globalThis.Error) {
        name = `(${causeName}) ${originalError.name}`;
        message = originalError.message;
        const messageLines = message.split("\n").length;
        stack = originalError.stack ? `(${causeName}) ${originalError.stack.split("\n").slice(0, messageLines + 3).join("\n")}` : `${name}: ${message}`;
      } else {
        name = causeName;
        message = toStringUnknown(originalError, 0);
        stack = `${name}: ${message}`;
      }
      if (traces.length > 0) {
        stack += `
    ${traces.join("\n    ")}`;
      }
      super(message);
      this._tag = _tag;
      this.traces = traces;
      this[MicroCauseTypeId] = microCauseVariance;
      this.name = name;
      this.stack = stack;
    }
    pipe() {
      return pipeArguments(this, arguments);
    }
    toString() {
      return this.stack;
    }
    [NodeInspectSymbol]() {
      return this.stack;
    }
  };
  var Fail = class extends MicroCauseImpl {
    error;
    constructor(error, traces = []) {
      super("Fail", error, traces);
      this.error = error;
    }
  };
  var causeFail = (error, traces = []) => new Fail(error, traces);
  var Die = class extends MicroCauseImpl {
    defect;
    constructor(defect, traces = []) {
      super("Die", defect, traces);
      this.defect = defect;
    }
  };
  var causeDie = (defect, traces = []) => new Die(defect, traces);
  var Interrupt = class extends MicroCauseImpl {
    constructor(traces = []) {
      super("Interrupt", "interrupted", traces);
    }
  };
  var causeInterrupt = (traces = []) => new Interrupt(traces);
  var causeIsFail = (self) => self._tag === "Fail";
  var causeIsInterrupt = (self) => self._tag === "Interrupt";
  var causeSquash = (self) => self._tag === "Fail" ? self.error : self._tag === "Die" ? self.defect : self;
  var causeWithTrace = /* @__PURE__ */ dual(2, (self, trace) => {
    const traces = [...self.traces, trace];
    switch (self._tag) {
      case "Die":
        return causeDie(self.defect, traces);
      case "Interrupt":
        return causeInterrupt(traces);
      case "Fail":
        return causeFail(self.error, traces);
    }
  });
  var MicroFiberTypeId = /* @__PURE__ */ Symbol.for("effect/Micro/MicroFiber");
  var fiberVariance = {
    _A: identity,
    _E: identity
  };
  var MicroFiberImpl = class {
    context;
    interruptible;
    [MicroFiberTypeId];
    _stack = [];
    _observers = [];
    _exit;
    _children;
    currentOpCount = 0;
    constructor(context, interruptible2 = true) {
      this.context = context;
      this.interruptible = interruptible2;
      this[MicroFiberTypeId] = fiberVariance;
    }
    getRef(ref) {
      return unsafeGetReference(this.context, ref);
    }
    addObserver(cb) {
      if (this._exit) {
        cb(this._exit);
        return constVoid;
      }
      this._observers.push(cb);
      return () => {
        const index = this._observers.indexOf(cb);
        if (index >= 0) {
          this._observers.splice(index, 1);
        }
      };
    }
    _interrupted = false;
    unsafeInterrupt() {
      if (this._exit) {
        return;
      }
      this._interrupted = true;
      if (this.interruptible) {
        this.evaluate(exitInterrupt);
      }
    }
    unsafePoll() {
      return this._exit;
    }
    evaluate(effect) {
      if (this._exit) {
        return;
      } else if (this._yielded !== void 0) {
        const yielded = this._yielded;
        this._yielded = void 0;
        yielded();
      }
      const exit2 = this.runLoop(effect);
      if (exit2 === Yield) {
        return;
      }
      const interruptChildren = fiberMiddleware.interruptChildren && fiberMiddleware.interruptChildren(this);
      if (interruptChildren !== void 0) {
        return this.evaluate(flatMap(interruptChildren, () => exit2));
      }
      this._exit = exit2;
      for (let i = 0; i < this._observers.length; i++) {
        this._observers[i](exit2);
      }
      this._observers.length = 0;
    }
    runLoop(effect) {
      let yielding = false;
      let current = effect;
      this.currentOpCount = 0;
      try {
        while (true) {
          this.currentOpCount++;
          if (!yielding && this.getRef(CurrentScheduler).shouldYield(this)) {
            yielding = true;
            const prev = current;
            current = flatMap(yieldNow, () => prev);
          }
          current = current[evaluate](this);
          if (current === Yield) {
            const yielded = this._yielded;
            if (MicroExitTypeId in yielded) {
              this._yielded = void 0;
              return yielded;
            }
            return Yield;
          }
        }
      } catch (error) {
        if (!hasProperty(current, evaluate)) {
          return exitDie(`MicroFiber.runLoop: Not a valid effect: ${String(current)}`);
        }
        return exitDie(error);
      }
    }
    getCont(symbol3) {
      while (true) {
        const op = this._stack.pop();
        if (!op) return void 0;
        const cont = op[ensureCont] && op[ensureCont](this);
        if (cont) return {
          [symbol3]: cont
        };
        if (op[symbol3]) return op;
      }
    }
    // cancel the yielded operation, or for the yielded exit value
    _yielded = void 0;
    yieldWith(value) {
      this._yielded = value;
      return Yield;
    }
    children() {
      return this._children ??= /* @__PURE__ */ new Set();
    }
  };
  var fiberMiddleware = /* @__PURE__ */ globalValue("effect/Micro/fiberMiddleware", () => ({
    interruptChildren: void 0
  }));
  var fiberInterruptAll = (fibers) => suspend(() => {
    for (const fiber of fibers) fiber.unsafeInterrupt();
    const iter = fibers[Symbol.iterator]();
    const wait = suspend(() => {
      let result = iter.next();
      while (!result.done) {
        if (result.value.unsafePoll()) {
          result = iter.next();
          continue;
        }
        const fiber = result.value;
        return async((resume) => {
          fiber.addObserver((_) => {
            resume(wait);
          });
        });
      }
      return exitVoid;
    });
    return wait;
  });
  var identifier = /* @__PURE__ */ Symbol.for("effect/Micro/identifier");
  var args = /* @__PURE__ */ Symbol.for("effect/Micro/args");
  var evaluate = /* @__PURE__ */ Symbol.for("effect/Micro/evaluate");
  var successCont = /* @__PURE__ */ Symbol.for("effect/Micro/successCont");
  var failureCont = /* @__PURE__ */ Symbol.for("effect/Micro/failureCont");
  var ensureCont = /* @__PURE__ */ Symbol.for("effect/Micro/ensureCont");
  var Yield = /* @__PURE__ */ Symbol.for("effect/Micro/Yield");
  var microVariance = {
    _A: identity,
    _E: identity,
    _R: identity
  };
  var MicroProto = {
    ...EffectPrototype2,
    _op: "Micro",
    [TypeId2]: microVariance,
    pipe() {
      return pipeArguments(this, arguments);
    },
    [Symbol.iterator]() {
      return new SingleShotGen(new YieldWrap(this));
    },
    toJSON() {
      return {
        _id: "Micro",
        op: this[identifier],
        ...args in this ? {
          args: this[args]
        } : void 0
      };
    },
    toString() {
      return format(this);
    },
    [NodeInspectSymbol]() {
      return format(this);
    }
  };
  function defaultEvaluate(_fiber) {
    return exitDie(`Micro.evaluate: Not implemented`);
  }
  var makePrimitiveProto = (options) => ({
    ...MicroProto,
    [identifier]: options.op,
    [evaluate]: options.eval ?? defaultEvaluate,
    [successCont]: options.contA,
    [failureCont]: options.contE,
    [ensureCont]: options.ensure
  });
  var makePrimitive = (options) => {
    const Proto = makePrimitiveProto(options);
    return function() {
      const self = Object.create(Proto);
      self[args] = options.single === false ? arguments : arguments[0];
      return self;
    };
  };
  var makeExit = (options) => {
    const Proto = {
      ...makePrimitiveProto(options),
      [MicroExitTypeId]: MicroExitTypeId,
      _tag: options.op,
      get [options.prop]() {
        return this[args];
      },
      toJSON() {
        return {
          _id: "MicroExit",
          _tag: options.op,
          [options.prop]: this[args]
        };
      },
      [symbol2](that) {
        return isMicroExit(that) && that._tag === options.op && equals(this[args], that[args]);
      },
      [symbol]() {
        return cached(this, combine(string(options.op))(hash(this[args])));
      }
    };
    return function(value) {
      const self = Object.create(Proto);
      self[args] = value;
      self[successCont] = void 0;
      self[failureCont] = void 0;
      self[ensureCont] = void 0;
      return self;
    };
  };
  var succeed = /* @__PURE__ */ makeExit({
    op: "Success",
    prop: "value",
    eval(fiber) {
      const cont = fiber.getCont(successCont);
      return cont ? cont[successCont](this[args], fiber) : fiber.yieldWith(this);
    }
  });
  var failCause = /* @__PURE__ */ makeExit({
    op: "Failure",
    prop: "cause",
    eval(fiber) {
      let cont = fiber.getCont(failureCont);
      while (causeIsInterrupt(this[args]) && cont && fiber.interruptible) {
        cont = fiber.getCont(failureCont);
      }
      return cont ? cont[failureCont](this[args], fiber) : fiber.yieldWith(this);
    }
  });
  var fail = (error) => failCause(causeFail(error));
  var sync = /* @__PURE__ */ makePrimitive({
    op: "Sync",
    eval(fiber) {
      const value = this[args]();
      const cont = fiber.getCont(successCont);
      return cont ? cont[successCont](value, fiber) : fiber.yieldWith(exitSucceed(value));
    }
  });
  var suspend = /* @__PURE__ */ makePrimitive({
    op: "Suspend",
    eval(_fiber) {
      return this[args]();
    }
  });
  var yieldNowWith = /* @__PURE__ */ makePrimitive({
    op: "Yield",
    eval(fiber) {
      let resumed = false;
      fiber.getRef(CurrentScheduler).scheduleTask(() => {
        if (resumed) return;
        fiber.evaluate(exitVoid);
      }, this[args] ?? 0);
      return fiber.yieldWith(() => {
        resumed = true;
      });
    }
  });
  var yieldNow = /* @__PURE__ */ yieldNowWith(0);
  var die = (defect) => exitDie(defect);
  var void_ = /* @__PURE__ */ succeed(void 0);
  var try_ = (options) => suspend(() => {
    try {
      return succeed(options.try());
    } catch (err) {
      return fail(options.catch(err));
    }
  });
  var promise = (evaluate2) => asyncOptions(function(resume, signal) {
    evaluate2(signal).then((a) => resume(succeed(a)), (e) => resume(die(e)));
  }, evaluate2.length !== 0);
  var tryPromise = (options) => asyncOptions(function(resume, signal) {
    try {
      options.try(signal).then((a) => resume(succeed(a)), (e) => resume(fail(options.catch(e))));
    } catch (err) {
      resume(fail(options.catch(err)));
    }
  }, options.try.length !== 0);
  var withMicroFiber = /* @__PURE__ */ makePrimitive({
    op: "WithMicroFiber",
    eval(fiber) {
      return this[args](fiber);
    }
  });
  var asyncOptions = /* @__PURE__ */ makePrimitive({
    op: "Async",
    single: false,
    eval(fiber) {
      const register = this[args][0];
      let resumed = false;
      let yielded = false;
      const controller = this[args][1] ? new AbortController() : void 0;
      const onCancel = register((effect) => {
        if (resumed) return;
        resumed = true;
        if (yielded) {
          fiber.evaluate(effect);
        } else {
          yielded = effect;
        }
      }, controller?.signal);
      if (yielded !== false) return yielded;
      yielded = true;
      fiber._yielded = () => {
        resumed = true;
      };
      if (controller === void 0 && onCancel === void 0) {
        return Yield;
      }
      fiber._stack.push(asyncFinalizer(() => {
        resumed = true;
        controller?.abort();
        return onCancel ?? exitVoid;
      }));
      return Yield;
    }
  });
  var asyncFinalizer = /* @__PURE__ */ makePrimitive({
    op: "AsyncFinalizer",
    ensure(fiber) {
      if (fiber.interruptible) {
        fiber.interruptible = false;
        fiber._stack.push(setInterruptible(true));
      }
    },
    contE(cause, _fiber) {
      return causeIsInterrupt(cause) ? flatMap(this[args](), () => failCause(cause)) : failCause(cause);
    }
  });
  var async = (register) => asyncOptions(register, register.length >= 2);
  var gen = (...args2) => suspend(() => fromIterator(args2.length === 1 ? args2[0]() : args2[1].call(args2[0])));
  var fromIterator = /* @__PURE__ */ makePrimitive({
    op: "Iterator",
    contA(value, fiber) {
      const state = this[args].next(value);
      if (state.done) return succeed(state.value);
      fiber._stack.push(this);
      return yieldWrapGet(state.value);
    },
    eval(fiber) {
      return this[successCont](void 0, fiber);
    }
  });
  var as = /* @__PURE__ */ dual(2, (self, value) => map(self, (_) => value));
  var andThen = /* @__PURE__ */ dual(2, (self, f) => flatMap(self, (a) => {
    const value = isMicro(f) ? f : typeof f === "function" ? f(a) : f;
    return isMicro(value) ? value : succeed(value);
  }));
  var tap = /* @__PURE__ */ dual(2, (self, f) => flatMap(self, (a) => {
    const value = isMicro(f) ? f : typeof f === "function" ? f(a) : f;
    return isMicro(value) ? as(value, a) : succeed(a);
  }));
  var exit = (self) => matchCause(self, {
    onFailure: exitFailCause,
    onSuccess: exitSucceed
  });
  var flatMap = /* @__PURE__ */ dual(2, (self, f) => {
    const onSuccess = Object.create(OnSuccessProto);
    onSuccess[args] = self;
    onSuccess[successCont] = f;
    return onSuccess;
  });
  var OnSuccessProto = /* @__PURE__ */ makePrimitiveProto({
    op: "OnSuccess",
    eval(fiber) {
      fiber._stack.push(this);
      return this[args];
    }
  });
  var map = /* @__PURE__ */ dual(2, (self, f) => flatMap(self, (a) => succeed(f(a))));
  var isMicroExit = (u) => hasProperty(u, MicroExitTypeId);
  var exitSucceed = succeed;
  var exitFailCause = failCause;
  var exitInterrupt = /* @__PURE__ */ exitFailCause(/* @__PURE__ */ causeInterrupt());
  var exitDie = (defect) => exitFailCause(causeDie(defect));
  var exitIsFailure = (self) => self._tag === "Failure";
  var exitVoid = /* @__PURE__ */ exitSucceed(void 0);
  var exitVoidAll = (exits) => {
    for (const exit2 of exits) {
      if (exit2._tag === "Failure") {
        return exit2;
      }
    }
    return exitVoid;
  };
  var setImmediate = "setImmediate" in globalThis ? globalThis.setImmediate : (f) => setTimeout(f, 0);
  var MicroSchedulerDefault = class {
    tasks = [];
    running = false;
    /**
     * @since 3.5.9
     */
    scheduleTask(task, _priority) {
      this.tasks.push(task);
      if (!this.running) {
        this.running = true;
        setImmediate(this.afterScheduled);
      }
    }
    /**
     * @since 3.5.9
     */
    afterScheduled = () => {
      this.running = false;
      this.runTasks();
    };
    /**
     * @since 3.5.9
     */
    runTasks() {
      const tasks = this.tasks;
      this.tasks = [];
      for (let i = 0, len = tasks.length; i < len; i++) {
        tasks[i]();
      }
    }
    /**
     * @since 3.5.9
     */
    shouldYield(fiber) {
      return fiber.currentOpCount >= fiber.getRef(MaxOpsBeforeYield);
    }
    /**
     * @since 3.5.9
     */
    flush() {
      while (this.tasks.length > 0) {
        this.runTasks();
      }
    }
  };
  var service = (tag) => withMicroFiber((fiber) => succeed(unsafeGet2(fiber.context, tag)));
  var updateContext = /* @__PURE__ */ dual(2, (self, f) => withMicroFiber((fiber) => {
    const prev = fiber.context;
    fiber.context = f(prev);
    return onExit(self, () => {
      fiber.context = prev;
      return void_;
    });
  }));
  var provideService = /* @__PURE__ */ dual(3, (self, tag, service2) => updateContext(self, add2(tag, service2)));
  var MaxOpsBeforeYield = class extends (/* @__PURE__ */ Reference2()("effect/Micro/currentMaxOpsBeforeYield", {
    defaultValue: () => 2048
  })) {
  };
  var CurrentConcurrency = class extends (/* @__PURE__ */ Reference2()("effect/Micro/currentConcurrency", {
    defaultValue: () => "unbounded"
  })) {
  };
  var CurrentScheduler = class extends (/* @__PURE__ */ Reference2()("effect/Micro/currentScheduler", {
    defaultValue: () => new MicroSchedulerDefault()
  })) {
  };
  var filterOrFail = /* @__PURE__ */ dual((args2) => isMicro(args2[0]), (self, refinement, orFailWith) => flatMap(self, (a) => refinement(a) ? succeed(a) : fail(orFailWith(a))));
  var catchAllCause = /* @__PURE__ */ dual(2, (self, f) => {
    const onFailure = Object.create(OnFailureProto);
    onFailure[args] = self;
    onFailure[failureCont] = f;
    return onFailure;
  });
  var OnFailureProto = /* @__PURE__ */ makePrimitiveProto({
    op: "OnFailure",
    eval(fiber) {
      fiber._stack.push(this);
      return this[args];
    }
  });
  var catchCauseIf = /* @__PURE__ */ dual(3, (self, predicate, f) => catchAllCause(self, (cause) => predicate(cause) ? f(cause) : failCause(cause)));
  var tapErrorCauseIf = /* @__PURE__ */ dual(3, (self, refinement, f) => catchCauseIf(self, refinement, (cause) => andThen(f(cause), failCause(cause))));
  var tapError = /* @__PURE__ */ dual(2, (self, f) => tapErrorCauseIf(self, causeIsFail, (fail2) => f(fail2.error)));
  var catchIf = /* @__PURE__ */ dual(3, (self, predicate, f) => catchCauseIf(self, (f2) => causeIsFail(f2) && predicate(f2.error), (fail2) => f(fail2.error)));
  var catchTag = /* @__PURE__ */ dual(3, (self, k, f) => catchIf(self, isTagged(k), f));
  var withTrace = function() {
    const prevLimit = globalThis.Error.stackTraceLimit;
    globalThis.Error.stackTraceLimit = 2;
    const error = new globalThis.Error();
    globalThis.Error.stackTraceLimit = prevLimit;
    function generate(name, cause) {
      const stack = error.stack;
      if (!stack) {
        return cause;
      }
      const line = stack.split("\n")[2]?.trim().replace(/^at /, "");
      if (!line) {
        return cause;
      }
      const lineMatch = line.match(/\((.*)\)$/);
      return causeWithTrace(cause, `at ${name} (${lineMatch ? lineMatch[1] : line})`);
    }
    const f = (name) => (self) => onError(self, (cause) => failCause(generate(name, cause)));
    if (arguments.length === 2) {
      return f(arguments[1])(arguments[0]);
    }
    return f(arguments[0]);
  };
  var matchCauseEffect = /* @__PURE__ */ dual(2, (self, options) => {
    const primitive = Object.create(OnSuccessAndFailureProto);
    primitive[args] = self;
    primitive[successCont] = options.onSuccess;
    primitive[failureCont] = options.onFailure;
    return primitive;
  });
  var OnSuccessAndFailureProto = /* @__PURE__ */ makePrimitiveProto({
    op: "OnSuccessAndFailure",
    eval(fiber) {
      fiber._stack.push(this);
      return this[args];
    }
  });
  var matchCause = /* @__PURE__ */ dual(2, (self, options) => matchCauseEffect(self, {
    onFailure: (cause) => sync(() => options.onFailure(cause)),
    onSuccess: (value) => sync(() => options.onSuccess(value))
  }));
  var MicroScopeTypeId = /* @__PURE__ */ Symbol.for("effect/Micro/MicroScope");
  var MicroScopeImpl = class _MicroScopeImpl {
    [MicroScopeTypeId];
    state = {
      _tag: "Open",
      finalizers: /* @__PURE__ */ new Set()
    };
    constructor() {
      this[MicroScopeTypeId] = MicroScopeTypeId;
    }
    unsafeAddFinalizer(finalizer) {
      if (this.state._tag === "Open") {
        this.state.finalizers.add(finalizer);
      }
    }
    addFinalizer(finalizer) {
      return suspend(() => {
        if (this.state._tag === "Open") {
          this.state.finalizers.add(finalizer);
          return void_;
        }
        return finalizer(this.state.exit);
      });
    }
    unsafeRemoveFinalizer(finalizer) {
      if (this.state._tag === "Open") {
        this.state.finalizers.delete(finalizer);
      }
    }
    close(microExit) {
      return suspend(() => {
        if (this.state._tag === "Open") {
          const finalizers = Array.from(this.state.finalizers).reverse();
          this.state = {
            _tag: "Closed",
            exit: microExit
          };
          return flatMap(forEach(finalizers, (finalizer) => exit(finalizer(microExit))), exitVoidAll);
        }
        return void_;
      });
    }
    get fork() {
      return sync(() => {
        const newScope = new _MicroScopeImpl();
        if (this.state._tag === "Closed") {
          newScope.state = this.state;
          return newScope;
        }
        function fin(exit2) {
          return newScope.close(exit2);
        }
        this.state.finalizers.add(fin);
        newScope.unsafeAddFinalizer((_) => sync(() => this.unsafeRemoveFinalizer(fin)));
        return newScope;
      });
    }
  };
  var onExit = /* @__PURE__ */ dual(2, (self, f) => uninterruptibleMask((restore) => matchCauseEffect(restore(self), {
    onFailure: (cause) => flatMap(f(exitFailCause(cause)), () => failCause(cause)),
    onSuccess: (a) => flatMap(f(exitSucceed(a)), () => succeed(a))
  })));
  var onExitIf = /* @__PURE__ */ dual(3, (self, refinement, f) => onExit(self, (exit2) => refinement(exit2) ? f(exit2) : exitVoid));
  var onError = /* @__PURE__ */ dual(2, (self, f) => onExitIf(self, exitIsFailure, (exit2) => f(exit2.cause)));
  var setInterruptible = /* @__PURE__ */ makePrimitive({
    op: "SetInterruptible",
    ensure(fiber) {
      fiber.interruptible = this[args];
      if (fiber._interrupted && fiber.interruptible) {
        return () => exitInterrupt;
      }
    }
  });
  var interruptible = (self) => withMicroFiber((fiber) => {
    if (fiber.interruptible) return self;
    fiber.interruptible = true;
    fiber._stack.push(setInterruptible(false));
    if (fiber._interrupted) return exitInterrupt;
    return self;
  });
  var uninterruptibleMask = (f) => withMicroFiber((fiber) => {
    if (!fiber.interruptible) return f(identity);
    fiber.interruptible = false;
    fiber._stack.push(setInterruptible(true));
    return f(interruptible);
  });
  var whileLoop = /* @__PURE__ */ makePrimitive({
    op: "While",
    contA(value, fiber) {
      this[args].step(value);
      if (this[args].while()) {
        fiber._stack.push(this);
        return this[args].body();
      }
      return exitVoid;
    },
    eval(fiber) {
      if (this[args].while()) {
        fiber._stack.push(this);
        return this[args].body();
      }
      return exitVoid;
    }
  });
  var forEach = (iterable, f, options) => withMicroFiber((parent) => {
    const concurrencyOption = options?.concurrency === "inherit" ? parent.getRef(CurrentConcurrency) : options?.concurrency ?? 1;
    const concurrency = concurrencyOption === "unbounded" ? Number.POSITIVE_INFINITY : Math.max(1, concurrencyOption);
    const items = fromIterable(iterable);
    let length = items.length;
    if (length === 0) {
      return options?.discard ? void_ : succeed([]);
    }
    const out = options?.discard ? void 0 : new Array(length);
    let index = 0;
    if (concurrency === 1) {
      return as(whileLoop({
        while: () => index < items.length,
        body: () => f(items[index], index),
        step: out ? (b) => out[index++] = b : (_) => index++
      }), out);
    }
    return async((resume) => {
      const fibers = /* @__PURE__ */ new Set();
      let result = void 0;
      let inProgress = 0;
      let doneCount = 0;
      let pumping = false;
      let interrupted = false;
      function pump() {
        pumping = true;
        while (inProgress < concurrency && index < length) {
          const currentIndex = index;
          const item = items[currentIndex];
          index++;
          inProgress++;
          try {
            const child = unsafeFork(parent, f(item, currentIndex), true, true);
            fibers.add(child);
            child.addObserver((exit2) => {
              fibers.delete(child);
              if (interrupted) {
                return;
              } else if (exit2._tag === "Failure") {
                if (result === void 0) {
                  result = exit2;
                  length = index;
                  fibers.forEach((fiber) => fiber.unsafeInterrupt());
                }
              } else if (out !== void 0) {
                out[currentIndex] = exit2.value;
              }
              doneCount++;
              inProgress--;
              if (doneCount === length) {
                resume(result ?? succeed(out));
              } else if (!pumping && inProgress < concurrency) {
                pump();
              }
            });
          } catch (err) {
            result = exitDie(err);
            length = index;
            fibers.forEach((fiber) => fiber.unsafeInterrupt());
          }
        }
        pumping = false;
      }
      pump();
      return suspend(() => {
        interrupted = true;
        index = length;
        return fiberInterruptAll(fibers);
      });
    });
  });
  var unsafeFork = (parent, effect, immediate = false, daemon = false) => {
    const child = new MicroFiberImpl(parent.context, parent.interruptible);
    if (!daemon) {
      parent.children().add(child);
      child.addObserver(() => parent.children().delete(child));
    }
    if (immediate) {
      child.evaluate(effect);
    } else {
      parent.getRef(CurrentScheduler).scheduleTask(() => child.evaluate(effect), 0);
    }
    return child;
  };
  var runFork = (effect, options) => {
    const fiber = new MicroFiberImpl(CurrentScheduler.context(options?.scheduler ?? new MicroSchedulerDefault()));
    fiber.evaluate(effect);
    if (options?.signal) {
      if (options.signal.aborted) {
        fiber.unsafeInterrupt();
      } else {
        const abort = () => fiber.unsafeInterrupt();
        options.signal.addEventListener("abort", abort, {
          once: true
        });
        fiber.addObserver(() => options.signal.removeEventListener("abort", abort));
      }
    }
    return fiber;
  };
  var runPromiseExit = (effect, options) => new Promise((resolve, _reject) => {
    const handle = runFork(effect, options);
    handle.addObserver(resolve);
  });
  var runPromise = (effect, options) => runPromiseExit(effect, options).then((exit2) => {
    if (exit2._tag === "Failure") {
      throw exit2.cause;
    }
    return exit2.value;
  });
  var runSyncExit = (effect) => {
    const scheduler = new MicroSchedulerDefault();
    const fiber = runFork(effect, {
      scheduler
    });
    scheduler.flush();
    return fiber._exit ?? exitDie(fiber);
  };
  var runSync = (effect) => {
    const exit2 = runSyncExit(effect);
    if (exit2._tag === "Failure") throw exit2.cause;
    return exit2.value;
  };
  var YieldableError = /* @__PURE__ */ (function() {
    class YieldableError2 extends globalThis.Error {
    }
    Object.assign(YieldableError2.prototype, MicroProto, StructuralPrototype, {
      [identifier]: "Failure",
      [evaluate]() {
        return fail(this);
      },
      toString() {
        return this.message ? `${this.name}: ${this.message}` : this.name;
      },
      toJSON() {
        return {
          ...this
        };
      },
      [NodeInspectSymbol]() {
        const stack = this.stack;
        if (stack) {
          return `${this.toString()}
${stack.split("\n").slice(1).join("\n")}`;
        }
        return this.toString();
      }
    });
    return YieldableError2;
  })();
  var Error2 = /* @__PURE__ */ (function() {
    return class extends YieldableError {
      constructor(args2) {
        super();
        if (args2) {
          Object.assign(this, args2);
        }
      }
    };
  })();
  var TaggedError = (tag) => {
    class Base2 extends Error2 {
      _tag = tag;
    }
    ;
    Base2.prototype.name = tag;
    return Base2;
  };

  // node_modules/@uploadthing/shared/dist/index.js
  var InvalidRouteConfigError = class extends TaggedError("InvalidRouteConfig") {
    constructor(type, field) {
      const reason = field ? `Expected route config to have a ${field} for key ${type} but none was found.` : `Encountered an invalid route config during backfilling. ${type} was not found.`;
      super({ reason });
    }
  };
  var UnknownFileTypeError = class extends TaggedError("UnknownFileType") {
    constructor(fileName) {
      const reason = `Could not determine type for ${fileName}`;
      super({ reason });
    }
  };
  var InvalidFileTypeError = class extends TaggedError("InvalidFileType") {
    constructor(fileType, fileName) {
      const reason = `File type ${fileType} not allowed for ${fileName}`;
      super({ reason });
    }
  };
  var InvalidFileSizeError = class extends TaggedError("InvalidFileSize") {
    constructor(fileSize) {
      const reason = `Invalid file size: ${fileSize}`;
      super({ reason });
    }
  };
  var InvalidURLError = class extends TaggedError("InvalidURL") {
    constructor(attemptedUrl) {
      super({ reason: `Failed to parse '${attemptedUrl}' as a URL.` });
    }
  };
  var RetryError = class extends TaggedError("RetryError") {
  };
  var FetchError = class extends TaggedError("FetchError") {
  };
  var InvalidJsonError = class extends TaggedError("InvalidJson") {
  };
  var BadRequestError = class extends TaggedError("BadRequestError") {
    getMessage() {
      if (isRecord(this.json)) {
        if (typeof this.json.message === "string") return this.json.message;
      }
      return this.message;
    }
  };
  var UploadPausedError = class extends TaggedError("UploadAborted") {
  };
  var UploadAbortedError = class extends TaggedError("UploadAborted") {
  };
  var getFullApiUrl = (maybeUrl) => gen(function* () {
    const base = (() => {
      if (typeof window !== "undefined") return window.location.origin;
      if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
      return "http://localhost:3000";
    })();
    const url = yield* try_({
      try: () => new URL(maybeUrl ?? "/api/uploadthing", base),
      catch: () => new InvalidURLError(maybeUrl ?? "/api/uploadthing")
    });
    if (url.pathname === "/") url.pathname = "/api/uploadthing";
    return url;
  });
  var resolveMaybeUrlArg = (maybeUrl) => {
    return maybeUrl instanceof URL ? maybeUrl : runSync(getFullApiUrl(maybeUrl));
  };
  function noop() {
  }
  function createIdentityProxy() {
    return new Proxy(noop, { get: (_, prop) => prop });
  }
  var ERROR_CODES = {
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    FORBIDDEN: 403,
    INTERNAL_SERVER_ERROR: 500,
    INTERNAL_CLIENT_ERROR: 500,
    TOO_LARGE: 413,
    TOO_SMALL: 400,
    TOO_MANY_FILES: 400,
    KEY_TOO_LONG: 400,
    URL_GENERATION_FAILED: 500,
    UPLOAD_FAILED: 500,
    MISSING_ENV: 500,
    INVALID_SERVER_CONFIG: 500,
    FILE_LIMIT_EXCEEDED: 500
  };
  function messageFromUnknown(cause, fallback) {
    if (typeof cause === "string") return cause;
    if (cause instanceof Error) return cause.message;
    if (cause && typeof cause === "object" && "message" in cause && typeof cause.message === "string") return cause.message;
    return fallback ?? "An unknown error occurred";
  }
  var UploadThingError = class UploadThingError2 extends Error2 {
    _tag = "UploadThingError";
    name = "UploadThingError";
    cause;
    code;
    data;
    constructor(initOpts) {
      const opts = typeof initOpts === "string" ? {
        code: "INTERNAL_SERVER_ERROR",
        message: initOpts
      } : initOpts;
      const message = opts.message ?? messageFromUnknown(opts.cause, opts.code);
      super({ message });
      this.code = opts.code;
      this.data = opts.data;
      if (opts.cause instanceof Error) this.cause = opts.cause;
      else if (isRecord(opts.cause) && isNumber(opts.cause.status) && isString(opts.cause.statusText)) this.cause = /* @__PURE__ */ new Error(`Response ${opts.cause.status} ${opts.cause.statusText}`);
      else if (isString(opts.cause)) this.cause = new Error(opts.cause);
      else this.cause = opts.cause;
    }
    static toObject(error) {
      return {
        code: error.code,
        message: error.message,
        data: error.data
      };
    }
    static serialize(error) {
      return JSON.stringify(UploadThingError2.toObject(error));
    }
  };
  function getErrorTypeFromStatusCode(statusCode) {
    for (const [code, status] of Object.entries(ERROR_CODES)) if (status === statusCode) return code;
    return "INTERNAL_SERVER_ERROR";
  }
  var FetchContext = class extends Tag2("uploadthing/Fetch")() {
  };
  var fetchEff = (input, init) => flatMap(service(FetchContext), (fetch) => {
    const headers = new Headers(init?.headers ?? []);
    const reqInfo = {
      url: input.toString(),
      method: init?.method,
      body: init?.body,
      headers: Object.fromEntries(headers)
    };
    return tryPromise({
      try: (signal) => fetch(input, {
        ...init,
        headers,
        signal
      }),
      catch: (error) => new FetchError({
        error: error instanceof Error ? {
          ...error,
          name: error.name,
          message: error.message,
          stack: error.stack
        } : error,
        input: reqInfo
      })
    }).pipe(tapError((e) => sync(() => console.error(e.input))), map((res) => Object.assign(res, { requestUrl: reqInfo.url })), withTrace("fetch"));
  });
  var parseResponseJson = (res) => tryPromise({
    try: async () => {
      const json = await res.json();
      return {
        json,
        ok: res.ok,
        status: res.status
      };
    },
    catch: (error) => new InvalidJsonError({
      error,
      input: res.requestUrl
    })
  }).pipe(filterOrFail(({ ok }) => ok, ({ json, status }) => new BadRequestError({
    status,
    message: `Request to ${res.requestUrl} failed with status ${status}`,
    json
  })), map(({ json }) => json), withTrace("parseJson"));
  var encoder = new TextEncoder();

  // node_modules/uploadthing/dist/ut-reporter-Dlppchbx.js
  var createDeferred = () => {
    let resolve;
    let reject;
    const ac = new AbortController();
    const promise2 = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    return {
      promise: promise2,
      ac,
      resolve,
      reject
    };
  };
  var randomHexString = /* @__PURE__ */ (function() {
    const characters = "abcdef0123456789";
    const charactersLength = 16;
    return function(length) {
      let result = "";
      for (let i = 0; i < length; i++) result += characters.charAt(Math.floor(Math.random() * charactersLength));
      return result;
    };
  })();
  var generateTraceHeaders = () => {
    const traceId = randomHexString(32);
    const spanId = randomHexString(16);
    const sampled = "01";
    return {
      b3: `${traceId}-${spanId}-${sampled}`,
      traceparent: `00-${traceId}-${spanId}-${sampled}`
    };
  };
  var createAPIRequestUrl = (config) => {
    const url = new URL(config.url);
    const queryParams = new URLSearchParams(url.search);
    queryParams.set("actionType", config.actionType);
    queryParams.set("slug", config.slug);
    url.search = queryParams.toString();
    return url;
  };
  var createUTReporter = (cfg) => (type, payload) => gen(function* () {
    const url = createAPIRequestUrl({
      url: cfg.url,
      slug: cfg.endpoint,
      actionType: type
    });
    const headers = new Headers(yield* promise(async () => typeof cfg.headers === "function" ? await cfg.headers() : cfg.headers));
    if (cfg.package) headers.set("x-uploadthing-package", cfg.package);
    headers.set("x-uploadthing-version", version);
    headers.set("Content-Type", "application/json");
    headers.set("b3", cfg.traceHeaders.b3);
    headers.set("traceparent", cfg.traceHeaders.traceparent);
    const response = yield* fetchEff(url, {
      method: "POST",
      body: JSON.stringify(payload),
      headers
    }).pipe(
      andThen(parseResponseJson),
      /**
      * We don't _need_ to validate the response here, just cast it for now.
      * As of now, @effect/schema includes quite a few bytes we cut out by this...
      * We have "strong typing" on the backend that ensures the shape should match.
      */
      map(unsafeCoerce),
      catchTag("FetchError", (e) => fail(new UploadThingError({
        code: "INTERNAL_CLIENT_ERROR",
        message: `Failed to report event "${type}" to UploadThing server`,
        cause: e
      }))),
      catchTag("BadRequestError", (e) => fail(new UploadThingError({
        code: getErrorTypeFromStatusCode(e.status),
        message: e.getMessage(),
        cause: e.json
      }))),
      catchTag("InvalidJson", (e) => fail(new UploadThingError({
        code: "INTERNAL_CLIENT_ERROR",
        message: "Failed to parse response from UploadThing server",
        cause: e
      })))
    );
    return response;
  });

  // node_modules/uploadthing/dist/deprecations-pLmw6Ytd.js
  var logDeprecationWarning = (message) => {
    console.warn(`\u26A0\uFE0F [uploadthing][deprecated] ${message}`);
  };

  // node_modules/uploadthing/client/index.js
  var uploadWithProgress = (file, rangeStart, presigned, opts) => async((resume) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", presigned.url, true);
    xhr.setRequestHeader("Range", `bytes=${rangeStart}-`);
    xhr.setRequestHeader("x-uploadthing-version", version);
    xhr.setRequestHeader("b3", opts.traceHeaders.b3);
    xhr.setRequestHeader("traceparent", opts.traceHeaders.traceparent);
    xhr.responseType = "json";
    let previousLoaded = 0;
    xhr.upload.addEventListener("progress", ({ loaded }) => {
      const delta = loaded - previousLoaded;
      opts.onUploadProgress?.({
        loaded,
        delta
      });
      previousLoaded = loaded;
    });
    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status < 300 && isRecord(xhr.response)) if (hasProperty(xhr.response, "error")) resume(new UploadThingError({
        code: "UPLOAD_FAILED",
        message: String(xhr.response.error),
        data: xhr.response
      }));
      else resume(succeed(xhr.response));
      else resume(new UploadThingError({
        code: "UPLOAD_FAILED",
        message: `XHR failed ${xhr.status} ${xhr.statusText}`,
        data: xhr.response
      }));
    });
    xhr.addEventListener("error", () => {
      resume(new UploadThingError({ code: "UPLOAD_FAILED" }));
    });
    const formData = new FormData();
    if ("uri" in file) formData.append("file", {
      uri: file.uri,
      type: file.type,
      name: file.name,
      ...rangeStart > 0 && { range: rangeStart }
    });
    else formData.append("file", rangeStart > 0 ? file.slice(rangeStart) : file);
    xhr.send(formData);
    return sync(() => xhr.abort());
  });
  var uploadFile = (file, presigned, opts) => fetchEff(presigned.url, {
    method: "HEAD",
    headers: opts.traceHeaders
  }).pipe(map(({ headers }) => parseInt(headers.get("x-ut-range-start") ?? "0", 10)), tap((start) => opts.onUploadProgress?.({
    delta: start,
    loaded: start
  })), flatMap((start) => uploadWithProgress(file, start, presigned, {
    traceHeaders: opts.traceHeaders,
    onUploadProgress: (progressEvent) => opts.onUploadProgress?.({
      delta: progressEvent.delta,
      loaded: progressEvent.loaded + start
    })
  })), map(unsafeCoerce), map((uploadResponse) => ({
    name: file.name,
    size: file.size,
    key: presigned.key,
    lastModified: file.lastModified,
    serverData: uploadResponse.serverData,
    get url() {
      logDeprecationWarning("`file.url` is deprecated and will be removed in uploadthing v9. Use `file.ufsUrl` instead.");
      return uploadResponse.url;
    },
    get appUrl() {
      logDeprecationWarning("`file.appUrl` is deprecated and will be removed in uploadthing v9. Use `file.ufsUrl` instead.");
      return uploadResponse.appUrl;
    },
    ufsUrl: uploadResponse.ufsUrl,
    customId: presigned.customId,
    type: file.type,
    fileHash: uploadResponse.fileHash
  })));
  var uploadFilesInternal = (endpoint, opts) => {
    const traceHeaders = generateTraceHeaders();
    const reportEventToUT = createUTReporter({
      endpoint: String(endpoint),
      package: opts.package,
      url: opts.url,
      headers: opts.headers,
      traceHeaders
    });
    const totalSize = opts.files.reduce((acc, f) => acc + f.size, 0);
    let totalLoaded = 0;
    return flatMap(reportEventToUT("upload", {
      input: "input" in opts ? opts.input : null,
      files: opts.files.map((f) => ({
        name: f.name,
        size: f.size,
        type: f.type,
        lastModified: f.lastModified
      }))
    }), (presigneds) => forEach(presigneds, (presigned, i) => flatMap(sync(() => opts.onUploadBegin?.({ file: opts.files[i].name })), () => uploadFile(opts.files[i], presigned, {
      traceHeaders,
      onUploadProgress: (ev) => {
        totalLoaded += ev.delta;
        opts.onUploadProgress?.({
          file: opts.files[i],
          progress: ev.loaded / opts.files[i].size * 100,
          loaded: ev.loaded,
          delta: ev.delta,
          totalLoaded,
          totalProgress: totalLoaded / totalSize
        });
      }
    })), { concurrency: 6 }));
  };
  var genUploader = (initOpts) => {
    const routeRegistry = createIdentityProxy();
    const controllableUpload = async (slug, opts) => {
      const uploads = /* @__PURE__ */ new Map();
      const endpoint = typeof slug === "function" ? slug(routeRegistry) : slug;
      const traceHeaders = generateTraceHeaders();
      const utReporter = createUTReporter({
        endpoint: String(endpoint),
        package: initOpts?.package ?? "uploadthing/client",
        url: resolveMaybeUrlArg(initOpts?.url),
        headers: opts.headers,
        traceHeaders
      });
      const fetchFn = initOpts?.fetch ?? window.fetch;
      const presigneds = await runPromise(utReporter("upload", {
        input: "input" in opts ? opts.input : null,
        files: opts.files.map((f) => ({
          name: f.name,
          size: f.size,
          type: f.type,
          lastModified: f.lastModified
        }))
      }).pipe(provideService(FetchContext, fetchFn)));
      const totalSize = opts.files.reduce((acc, f) => acc + f.size, 0);
      let totalLoaded = 0;
      const uploadEffect = (file, presigned) => uploadFile(file, presigned, {
        traceHeaders,
        onUploadProgress: (progressEvent) => {
          totalLoaded += progressEvent.delta;
          opts.onUploadProgress?.({
            ...progressEvent,
            file,
            progress: Math.round(progressEvent.loaded / file.size * 100),
            totalLoaded,
            totalProgress: Math.round(totalLoaded / totalSize * 100)
          });
        }
      }).pipe(provideService(FetchContext, fetchFn));
      for (const [i, p] of presigneds.entries()) {
        const file = opts.files[i];
        if (!file) continue;
        const deferred = createDeferred();
        uploads.set(file, {
          deferred,
          presigned: p
        });
        runPromiseExit(uploadEffect(file, p), { signal: deferred.ac.signal }).then((result) => {
          if (result._tag === "Success") return deferred.resolve(result.value);
          else if (result.cause._tag === "Interrupt") throw new UploadPausedError();
          throw causeSquash(result.cause);
        }).catch((err) => {
          if (err instanceof UploadPausedError) return;
          deferred.reject(err);
        });
      }
      const pauseUpload = (file) => {
        const files = ensure(file ?? opts.files);
        for (const file$1 of files) {
          const upload = uploads.get(file$1);
          if (!upload) return;
          if (upload.deferred.ac.signal.aborted) throw new UploadAbortedError();
          upload.deferred.ac.abort();
        }
      };
      const resumeUpload = (file) => {
        const files = ensure(file ?? opts.files);
        for (const file$1 of files) {
          const upload = uploads.get(file$1);
          if (!upload) throw "No upload found";
          upload.deferred.ac = new AbortController();
          runPromiseExit(uploadEffect(file$1, upload.presigned), { signal: upload.deferred.ac.signal }).then((result) => {
            if (result._tag === "Success") return upload.deferred.resolve(result.value);
            else if (result.cause._tag === "Interrupt") throw new UploadPausedError();
            throw causeSquash(result.cause);
          }).catch((err) => {
            if (err instanceof UploadPausedError) return;
            upload.deferred.reject(err);
          });
        }
      };
      const done = async (file) => {
        const promises = [];
        const files = ensure(file ?? opts.files);
        for (const file$1 of files) {
          const upload = uploads.get(file$1);
          if (!upload) throw "No upload found";
          promises.push(upload.deferred.promise);
        }
        const results = await Promise.all(promises);
        return file ? results[0] : results;
      };
      return {
        pauseUpload,
        resumeUpload,
        done
      };
    };
    const typedUploadFiles = (slug, opts) => {
      const endpoint = typeof slug === "function" ? slug(routeRegistry) : slug;
      const fetchFn = initOpts?.fetch ?? window.fetch;
      return uploadFilesInternal(endpoint, {
        ...opts,
        skipPolling: {},
        url: resolveMaybeUrlArg(initOpts?.url),
        package: initOpts?.package ?? "uploadthing/client",
        input: opts.input
      }).pipe(provideService(FetchContext, fetchFn), (effect) => runPromiseExit(effect, opts.signal && { signal: opts.signal })).then((exit2) => {
        if (exit2._tag === "Success") return exit2.value;
        else if (exit2.cause._tag === "Interrupt") throw new UploadAbortedError();
        throw causeSquash(exit2.cause);
      });
    };
    return {
      uploadFiles: typedUploadFiles,
      createUpload: controllableUpload,
      routeRegistry
    };
  };

  // ut-entry.js
  var ut = genUploader({
    url: "/api/uploadthing",
    package: "nexus-auis"
  });
  window.uploadFiles = ut.uploadFiles;
})();
