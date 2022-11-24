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
export declare class CityImprovementRegistry
  extends EntityRegistry<CityImprovement>
  implements ICityImprovementRegistry
{
  constructor();
  getByCity(city: City, includeDestroyed?: boolean): CityImprovement[];
}
export declare const instance: CityImprovementRegistry;
export default CityImprovementRegistry;
