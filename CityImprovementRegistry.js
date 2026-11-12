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
        // Likewise an improvement's constructor never changes. Asked from inside `CityBuild#available()`, for every city and
        //  every Wonder, whether one has ever been built: a scan of every improvement there would add two thirds to it
        //  (civ-clone/web-renderer#971).
        this._byType = this.index((cityImprovement) => cityImprovement.constructor);
    }
    /**
     * The improvements in `city`, in the order they were registered. One that has been destroyed (sold, sabotaged, lost
     *  with its city) stays registered, flagged `destroyed()`: it is left out, unless `includeDestroyed`.
     */
    getByCity(city, includeDestroyed = false) {
        return this.withoutDestroyed(this._byCity.get(city), includeDestroyed);
    }
    /**
     * The improvements whose constructor is exactly `Type`, in any city, in the order they were registered: a subclass of
     *  `Type` is a type of its own, and is not given. A destroyed one is left out, unless `includeDestroyed`: with it, this
     *  says whether `Type` was ever built (and registered) in the game (civ-clone/web-renderer#971).
     */
    getByType(Type, includeDestroyed = false) {
        return this.withoutDestroyed(this._byType.get(Type), includeDestroyed);
    }
    withoutDestroyed(cityImprovements, includeDestroyed) {
        if (includeDestroyed) {
            return cityImprovements;
        }
        return cityImprovements.filter((cityImprovement) => !cityImprovement.destroyed());
    }
}
exports.CityImprovementRegistry = CityImprovementRegistry;
exports.instance = new CityImprovementRegistry();
exports.default = CityImprovementRegistry;
//# sourceMappingURL=CityImprovementRegistry.js.map