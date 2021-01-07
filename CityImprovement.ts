import City from '@civ-clone/core-city/City';
import Player from '@civ-clone/core-player/Player';
import {
  RuleRegistry,
  instance as ruleRegistryInstance,
} from '@civ-clone/core-rule/RuleRegistry';
import Created, { ICreatedRegistry } from './Rules/Created';

export interface ICityImprovement {
  city(): City;
  player(): Player;
}

export class CityImprovement implements ICityImprovement {
  #city: City;
  #ruleRegistry: RuleRegistry;
  #player: Player;

  constructor(
    player: Player,
    city: City,
    ruleRegistry: RuleRegistry = ruleRegistryInstance
  ) {
    this.#city = city;
    this.#player = player;
    this.#ruleRegistry = ruleRegistry;

    (this.#ruleRegistry as ICreatedRegistry).process(Created, this, city);
  }

  city(): City {
    return this.#city;
  }

  static createFromObject({
    city,
    player,
    ruleRegistry = ruleRegistryInstance,
  }: {
    city: City;
    player: Player;
    ruleRegistry: RuleRegistry;
  }): CityImprovement {
    return new this(player, city, ruleRegistry);
  }

  player(): Player {
    return this.#player;
  }
}

export default CityImprovement;
