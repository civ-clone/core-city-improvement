"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instance = exports.CityImprovementRegistry = void 0;
const CityImprovement_1 = require("./CityImprovement");
const EntityRegistry_1 = require("@civ-clone/core-registry/EntityRegistry");
class CityImprovementRegistry extends EntityRegistry_1.EntityRegistry {
    constructor() {
        super(CityImprovement_1.default);
        // An improvement's city is set when it's built and never changes, so the index can't go stale and needs no
        //  `reindex`. Whether it's destroyed does change, so that is still asked at each lookup. Scanning every improvement
        //  for each lookup was 4% of a late-game turn (civ-clone/web-renderer#308).
        this._byCity = this.index((cityImprovement) => cityImprovement.city());
    }
    getByCity(city, includeDestroyed = false) {
        return this._byCity
            .get(city)
            .filter((cityImprovement) => !cityImprovement.destroyed());
    }
}
exports.CityImprovementRegistry = CityImprovementRegistry;
exports.instance = new CityImprovementRegistry();
exports.default = CityImprovementRegistry;
//# sourceMappingURL=CityImprovementRegistry.js.map