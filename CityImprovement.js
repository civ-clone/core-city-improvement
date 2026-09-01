"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CityImprovement = void 0;
const Buildable_1 = require("@civ-clone/core-city-build/Buildable");
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
const Created_1 = require("./Rules/Created");
class CityImprovement extends Buildable_1.Buildable {
    constructor(city, ruleRegistry = RuleRegistry_1.instance) {
        super();
        this._destroyed = false;
        this.addKey('destroyed');
        this._city = city;
        this._ruleRegistry = ruleRegistry;
        this._ruleRegistry.process(Created_1.default, this, city);
    }
    static build(city, ruleRegistry = RuleRegistry_1.instance) {
        return new this(city, ruleRegistry);
    }
    city() {
        return this._city;
    }
    destroy() {
        this._destroyed = true;
    }
    destroyed() {
        return this._destroyed;
    }
}
exports.CityImprovement = CityImprovement;
exports.default = CityImprovement;
//# sourceMappingURL=CityImprovement.js.map