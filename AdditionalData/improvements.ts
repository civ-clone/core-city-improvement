import {
  CityImprovementRegistry,
  instance as cityImprovementRegistryInstance,
} from '../CityImprovementRegistry';
import AdditionalData from '@civ-clone/core-data-object/AdditionalData';
import City from '@civ-clone/core-city/City';

export const getAdditionalData = (
  cityImprovementRegistry: CityImprovementRegistry = cityImprovementRegistryInstance
) => [
  new AdditionalData(City, 'improvements', (city: City) =>
    cityImprovementRegistry.getByCity(city)
  ),
];

export default getAdditionalData;
