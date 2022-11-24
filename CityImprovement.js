"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _CityImprovement_city, _CityImprovement_destroyed, _CityImprovement_ruleRegistry;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CityImprovement = void 0;
const Buildable_1 = require("@civ-clone/core-city-build/Buildable");
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
const Created_1 = require("./Rules/Created");
class CityImprovement extends Buildable_1.Buildable {
    constructor(city, ruleRegistry = RuleRegistry_1.instance) {
        super();
        _CityImprovement_city.set(this, void 0);
        _CityImprovement_destroyed.set(this, false);
        _CityImprovement_ruleRegistry.set(this, void 0);
        __classPrivateFieldSet(this, _CityImprovement_city, city, "f");
        __classPrivateFieldSet(this, _CityImprovement_ruleRegistry, ruleRegistry, "f");
        __classPrivateFieldGet(this, _CityImprovement_ruleRegistry, "f").process(Created_1.default, this, city);
    }
    static build(city, ruleRegistry = RuleRegistry_1.instance) {
        return new this(city, ruleRegistry);
    }
    city() {
        return __classPrivateFieldGet(this, _CityImprovement_city, "f");
    }
    destroy() {
        __classPrivateFieldSet(this, _CityImprovement_destroyed, true, "f");
    }
    destroyed() {
        return __classPrivateFieldGet(this, _CityImprovement_destroyed, "f");
    }
}
exports.CityImprovement = CityImprovement;
_CityImprovement_city = new WeakMap(), _CityImprovement_destroyed = new WeakMap(), _CityImprovement_ruleRegistry = new WeakMap();
exports.default = CityImprovement;
//# sourceMappingURL=CityImprovement.js.map