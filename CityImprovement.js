"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _city, _ruleRegistry, _player;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CityImprovement = void 0;
const Buildable_1 = require("@civ-clone/core-city-build/Buildable");
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
const Created_1 = require("./Rules/Created");
// https://github.com/microsoft/TypeScript/issues/4628
// @ts-expect-error
class CityImprovement extends Buildable_1.Buildable {
    constructor(player, city, ruleRegistry = RuleRegistry_1.instance) {
        super();
        _city.set(this, void 0);
        _ruleRegistry.set(this, void 0);
        _player.set(this, void 0);
        __classPrivateFieldSet(this, _city, city);
        __classPrivateFieldSet(this, _player, player);
        __classPrivateFieldSet(this, _ruleRegistry, ruleRegistry);
        __classPrivateFieldGet(this, _ruleRegistry).process(Created_1.default, this, city);
    }
    city() {
        return __classPrivateFieldGet(this, _city);
    }
    static build(city, ruleRegistry = RuleRegistry_1.instance) {
        return new this(city.player(), city, ruleRegistry);
    }
    player() {
        return __classPrivateFieldGet(this, _player);
    }
}
exports.CityImprovement = CityImprovement;
_city = new WeakMap(), _ruleRegistry = new WeakMap(), _player = new WeakMap();
exports.default = CityImprovement;
//# sourceMappingURL=CityImprovement.js.map