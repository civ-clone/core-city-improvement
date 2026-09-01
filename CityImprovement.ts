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
  private _city: City;
  private _destroyed: boolean = false;
  private _ruleRegistry: ICreatedRegistry;

  constructor(city: City, ruleRegistry: RuleRegistry = ruleRegistryInstance) {
    super();

    this.addKey('destroyed');

    this._city = city;
    this._ruleRegistry = ruleRegistry;

    this._ruleRegistry.process(Created, this, city);
  }

  public static build(
    city: City,
    ruleRegistry: RuleRegistry = ruleRegistryInstance
  ): BuildableInstance {
    return new this(city, ruleRegistry) as BuildableInstance;
  }

  city(): City {
    return this._city;
  }

  destroy(): void {
    this._destroyed = true;
  }

  destroyed() {
    return this._destroyed;
  }
}

export default CityImprovement;
