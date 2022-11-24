import {
  Buildable,
  BuildableInstance,
  IBuildable,
} from '@civ-clone/core-city-build/Buildable';
import {
  RuleRegistry,
  instance as ruleRegistryInstance,
} from '@civ-clone/core-rule/RuleRegistry';
import City from '@civ-clone/core-city/City';
import Player from '@civ-clone/core-player/Player';
import Created, { ICreatedRegistry } from './Rules/Created';
import { IDataObject } from '@civ-clone/core-data-object/DataObject';

export interface ICityImprovement extends IDataObject {
  city(): City;
  destroy(): void;
}

export class CityImprovement extends Buildable implements ICityImprovement {
  #city: City;
  #destroyed: boolean = false;
  #ruleRegistry: ICreatedRegistry;

  constructor(city: City, ruleRegistry: RuleRegistry = ruleRegistryInstance) {
    super();

    this.addKey('destroyed');

    this.#city = city;
    this.#ruleRegistry = ruleRegistry;

    this.#ruleRegistry.process(Created, this, city);
  }

  public static build(
    city: City,
    ruleRegistry: RuleRegistry = ruleRegistryInstance
  ): BuildableInstance {
    return new this(city, ruleRegistry) as BuildableInstance;
  }

  city(): City {
    return this.#city;
  }

  destroy(): void {
    this.#destroyed = true;
  }

  destroyed() {
    return this.#destroyed;
  }
}

export default CityImprovement;
