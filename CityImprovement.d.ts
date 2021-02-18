import {
  DataObject,
  IDataObject,
} from '@civ-clone/core-data-object/DataObject';
import { RuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
import City from '@civ-clone/core-city/City';
import Player from '@civ-clone/core-player/Player';
export interface ICityImprovement extends IDataObject {
  city(): City;
  player(): Player;
}
export declare class CityImprovement
  extends DataObject
  implements ICityImprovement {
  #private;
  constructor(player: Player, city: City, ruleRegistry?: RuleRegistry);
  city(): City;
  static createFromObject({
    city,
    player,
    ruleRegistry,
  }: {
    city: City;
    player: Player;
    ruleRegistry: RuleRegistry;
  }): CityImprovement;
  player(): Player;
}
export default CityImprovement;
