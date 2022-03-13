import { Buildable, IBuildable } from '@civ-clone/core-city-build/Buildable';
import { RuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
import City from '@civ-clone/core-city/City';
import Player from '@civ-clone/core-player/Player';
export interface ICityImprovement extends IBuildable {
  city(): City;
  player(): Player;
}
export declare class CityImprovement
  extends Buildable
  implements ICityImprovement {
  #private;
  constructor(player: Player, city: City, ruleRegistry?: RuleRegistry);
  city(): City;
  static build(city: City, ruleRegistry?: RuleRegistry): CityImprovement;
  player(): Player;
}
export default CityImprovement;
