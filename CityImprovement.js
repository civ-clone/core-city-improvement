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
const Created_1 = require("./Rules/Created");
const DataObject_1 = require("@civ-clone/core-data-object/DataObject");
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
class CityImprovement extends DataObject_1.DataObject {
    constructor(player, city, ruleRegistry = RuleRegistry_1.instance) {
        super();
        _city.set(this, void 0);
        _ruleRegistry.set(this, void 0);
        _player.set(this, void 0);
        __classPrivateFieldSet(this, _city, city);
        __classPrivateFieldSet(this, _player, player);
        __classPrivateFieldSet(this, _ruleRegistry, ruleRegistry);
        __classPrivateFieldGet(this, _ruleRegistry).process(Created_1.Created, this, city);
    }
    city() {
        return __classPrivateFieldGet(this, _city);
    }
    static createFromObject({ city, player, ruleRegistry = RuleRegistry_1.instance, }) {
        return new this(player, city, ruleRegistry);
    }
    player() {
        return __classPrivateFieldGet(this, _player);
    }
}
exports.CityImprovement = CityImprovement;
_city = new WeakMap(), _ruleRegistry = new WeakMap(), _player = new WeakMap();
exports.default = CityImprovement;
//# sourceMappingURL=CityImprovement.js.map