import {
  Buildable,
  BuildableInstance,
} from '@civ-clone/core-city-build/Buildable';
import { RuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
import City from '@civ-clone/core-city/City';
import { IDataObject } from '@civ-clone/core-data-object/DataObject';
export interface ICityImprovement extends IDataObject {
  city(): City;
  destroy(): void;
}
export declare class CityImprovement
  extends Buildable
  implements ICityImprovement
{
  #private;
  constructor(city: City, ruleRegistry?: RuleRegistry);
  static build(city: City, ruleRegistry?: RuleRegistry): BuildableInstance;
  city(): City;
  destroy(): void;
  destroyed(): boolean;
}
export default CityImprovement;
