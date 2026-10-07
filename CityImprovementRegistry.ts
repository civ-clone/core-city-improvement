import City from '@civ-clone/core-city/City';
import CityImprovement from './CityImprovement';
import {
  EntityRegistry,
  IEntityRegistry,
} from '@civ-clone/core-registry/EntityRegistry';

export interface ICityImprovementRegistry
  extends IEntityRegistry<CityImprovement> {
  getByCity(city: City, includeDestroyed?: boolean): CityImprovement[];
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

  constructor() {
    super(CityImprovement);
  }

  getByCity(city: City, includeDestroyed: boolean = false) {
    return this._byCity
      .get(city)
      .filter(
        (cityImprovement: CityImprovement): boolean =>
          !cityImprovement.destroyed()
      );
  }
}

export const instance: CityImprovementRegistry = new CityImprovementRegistry();

export default CityImprovementRegistry;
