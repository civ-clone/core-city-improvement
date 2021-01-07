import City from '@civ-clone/core-city/City';
import CityImprovement from '../CityImprovement';
import { IRuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
import Rule from '@civ-clone/core-rule/Rule';

export class Created extends Rule<[CityImprovement, City], void> {}

export default Created;

export interface ICreatedRegistry
  extends IRuleRegistry<Created, [CityImprovement, City], void> {}
