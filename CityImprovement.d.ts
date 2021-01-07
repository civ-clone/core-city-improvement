import City from '@civ-clone/core-city/City';
import Player from '@civ-clone/core-player/Player';
import { RuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
export interface ICityImprovement {
  city(): City;
  player(): Player;
}
export declare class CityImprovement implements ICityImprovement {
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
