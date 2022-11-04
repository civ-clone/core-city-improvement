import { Buildable, IBuildable } from '@civ-clone/core-city-build/Buildable';
import { RuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
import City from '@civ-clone/core-city/City';
export interface ICityImprovement extends IBuildable {
  city(): City;
}
export declare class CityImprovement
  extends Buildable
  implements ICityImprovement {
  #private;
  constructor(city: City, ruleRegistry?: RuleRegistry);
  city(): City;
  static build(city: City, ruleRegistry?: RuleRegistry): CityImprovement;
}
export default CityImprovement;
