import City from '@civ-clone/core-city/City';
import CityImprovement from './CityImprovement';
import {
  EntityRegistry,
  IEntityRegistry,
} from '@civ-clone/core-registry/EntityRegistry';

export interface ICityImprovementRegistry
  extends IEntityRegistry<CityImprovement> {
  getByCity(city: City, includeDestroyed?: boolean): CityImprovement[];
  getByType(
    Type: typeof CityImprovement,
    includeDestroyed?: boolean
  ): CityImprovement[];
}

export class CityImprovementRegistry
  extends EntityRegistry<CityImprovement>
  implements ICityImprovementRegistry
{
  // An improvement's city is set when it's built and never changes, so the index can't go stale and needs no
  //  `reindex`. Whether it's destroyed does change, so that is still asked at each lookup. Scanning every improvement
  //  for each lookup was 4% of a late-game turn (civ-clone/web-renderer#308).
  private _byCity = this.index(
    (cityImprovement: CityImprovement): City => cityImprovement.city()
  );
  // Likewise an improvement's constructor never changes. Asked from inside `CityBuild#available()`, for every city and
  //  every Wonder, whether one has ever been built: a scan of every improvement there would add two thirds to it
  //  (civ-clone/web-renderer#971).
  private _byType = this.index(
    (cityImprovement: CityImprovement): typeof CityImprovement =>
      cityImprovement.constructor as typeof CityImprovement
  );

  constructor() {
    super(CityImprovement);
  }

  /**
   * The improvements in `city`, in the order they were registered. One that has been destroyed (sold, sabotaged, lost
   *  with its city) stays registered, flagged `destroyed()`: it is left out, unless `includeDestroyed`.
   */
  getByCity(city: City, includeDestroyed: boolean = false): CityImprovement[] {
    return this.withoutDestroyed(this._byCity.get(city), includeDestroyed);
  }

  /**
   * The improvements whose constructor is exactly `Type`, in any city, in the order they were registered: a subclass of
   *  `Type` is a type of its own, and is not given. A destroyed one is left out, unless `includeDestroyed`: with it, this
   *  says whether `Type` was ever built (and registered) in the game (civ-clone/web-renderer#971).
   */
  getByType(
    Type: typeof CityImprovement,
    includeDestroyed: boolean = false
  ): CityImprovement[] {
    return this.withoutDestroyed(this._byType.get(Type), includeDestroyed);
  }

  private withoutDestroyed(
    cityImprovements: CityImprovement[],
    includeDestroyed: boolean
  ): CityImprovement[] {
    if (includeDestroyed) {
      return cityImprovements;
    }

    return cityImprovements.filter(
      (cityImprovement: CityImprovement): boolean =>
        !cityImprovement.destroyed()
    );
  }
}

export const instance: CityImprovementRegistry = new CityImprovementRegistry();

export default CityImprovementRegistry;
