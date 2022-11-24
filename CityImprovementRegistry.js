"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instance = exports.CityImprovementRegistry = void 0;
const CityImprovement_1 = require("./CityImprovement");
const EntityRegistry_1 = require("@civ-clone/core-registry/EntityRegistry");
class CityImprovementRegistry extends EntityRegistry_1.EntityRegistry {
    constructor() {
        super(CityImprovement_1.default);
    }
    getByCity(city, includeDestroyed = false) {
        return this.filter((cityImprovement) => cityImprovement.city() === city && !cityImprovement.destroyed());
    }
}
exports.CityImprovementRegistry = CityImprovementRegistry;
exports.instance = new CityImprovementRegistry();
exports.default = CityImprovementRegistry;
//# sourceMappingURL=CityImprovementRegistry.js.map