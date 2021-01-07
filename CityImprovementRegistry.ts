import City from '@civ-clone/core-city/City';
import CityImprovement from './CityImprovement';
import {
  EntityRegistry,
  IEntityRegistry,
} from '@civ-clone/core-registry/EntityRegistry';

export interface ICityImprovementRegistry
  extends IEntityRegistry<CityImprovement> {
  getByCity(city: City): CityImprovement[];
}

export class CityImprovementRegistry
  extends EntityRegistry<CityImprovement>
  implements ICityImprovementRegistry {
  constructor() {
    super(CityImprovement);
  }

  getByCity(city: City) {
    return this.filter(
      (cityImprovement: CityImprovement): boolean =>
        cityImprovement.city() === city
    );
  }
}

export const instance: CityImprovementRegistry = new CityImprovementRegistry();

export default CityImprovementRegistry;
