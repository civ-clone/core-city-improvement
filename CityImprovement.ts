import { Buildable, IBuildable } from '@civ-clone/core-city-build/Buildable';
import {
  RuleRegistry,
  instance as ruleRegistryInstance,
} from '@civ-clone/core-rule/RuleRegistry';
import City from '@civ-clone/core-city/City';
import Player from '@civ-clone/core-player/Player';
import Created, { ICreatedRegistry } from './Rules/Created';

export interface ICityImprovement extends IBuildable {
  city(): City;
  player(): Player;
}

// https://github.com/microsoft/TypeScript/issues/4628
// @ts-expect-error
export class CityImprovement extends Buildable implements ICityImprovement {
  #city: City;
  #ruleRegistry: ICreatedRegistry;
  #player: Player;

  constructor(
    player: Player,
    city: City,
    ruleRegistry: RuleRegistry = ruleRegistryInstance
  ) {
    super();

    this.#city = city;
    this.#player = player;
    this.#ruleRegistry = ruleRegistry;

    this.#ruleRegistry.process(Created, this, city);
  }

  city(): City {
    return this.#city;
  }

  public static build(
    city: City,
    ruleRegistry: RuleRegistry = ruleRegistryInstance
  ): CityImprovement {
    return new this(city.player(), city, ruleRegistry);
  }

  player(): Player {
    return this.#player;
  }
}

export default CityImprovement;
