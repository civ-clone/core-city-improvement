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
export declare class CityImprovementRegistry
  extends EntityRegistry<CityImprovement>
  implements ICityImprovementRegistry
{
  private _byCity;
  private _byType;
  constructor();
  /**
   * The improvements in `city`, in the order they were registered. One that has been destroyed (sold, sabotaged, lost
   *  with its city) stays registered, flagged `destroyed()`: it is left out, unless `includeDestroyed`.
   */
  getByCity(city: City, includeDestroyed?: boolean): CityImprovement[];
  /**
   * The improvements whose constructor is exactly `Type`, in any city, in the order they were registered: a subclass of
   *  `Type` is a type of its own, and is not given. A destroyed one is left out, unless `includeDestroyed`: with it, this
   *  says whether `Type` was ever built (and registered) in the game (civ-clone/web-renderer#971).
   */
  getByType(
    Type: typeof CityImprovement,
    includeDestroyed?: boolean
  ): CityImprovement[];
  private withoutDestroyed;
}
export declare const instance: CityImprovementRegistry;
export default CityImprovementRegistry;
