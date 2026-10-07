import CityImprovement from '../CityImprovement';
import CityImprovementRegistry from '../CityImprovementRegistry';
import RuleRegistry from '@civ-clone/core-rule/RuleRegistry';
import { expect } from 'chai';
import setUpCity from '@civ-clone/core-city/tests/lib/setUpCity';

describe('CityImprovementRegistry', (): void => {
  it("should return a city's improvements, in the order they were registered", async (): Promise<void> => {
    const ruleRegistry = new RuleRegistry(),
      registry = new CityImprovementRegistry(),
      city = await setUpCity('city', ruleRegistry),
      otherCity = await setUpCity('other', ruleRegistry),
      first = new CityImprovement(city, ruleRegistry),
      other = new CityImprovement(otherCity, ruleRegistry),
      second = new CityImprovement(city, ruleRegistry);

    registry.register(first, other, second);

    expect(registry.getByCity(city)).to.deep.equal([first, second]);
    expect(registry.getByCity(otherCity)).to.deep.equal([other]);
  });

  it('should leave out an improvement destroyed after it was registered', async (): Promise<void> => {
    const ruleRegistry = new RuleRegistry(),
      registry = new CityImprovementRegistry(),
      city = await setUpCity('city', ruleRegistry),
      kept = new CityImprovement(city, ruleRegistry),
      destroyed = new CityImprovement(city, ruleRegistry);

    registry.register(kept, destroyed);
    destroyed.destroy();

    expect(registry.getByCity(city)).to.deep.equal([kept]);
  });

  it('should forget an unregistered improvement, and find improvements registered before the lookup was first used', async (): Promise<void> => {
    const ruleRegistry = new RuleRegistry(),
      registry = new CityImprovementRegistry(),
      city = await setUpCity('city', ruleRegistry),
      improvement = new CityImprovement(city, ruleRegistry);

    registry.register(improvement);
    registry.unregister(improvement);

    expect(registry.getByCity(city)).to.deep.equal([]);

    registry.register(improvement);

    expect(registry.getByCity(city)).to.deep.equal([improvement]);
  });

  it("should not let a caller change the registry by changing what it's given", async (): Promise<void> => {
    const ruleRegistry = new RuleRegistry(),
      registry = new CityImprovementRegistry(),
      city = await setUpCity('city', ruleRegistry),
      improvement = new CityImprovement(city, ruleRegistry);

    registry.register(improvement);
    registry.getByCity(city).splice(0, 1);

    expect(registry.getByCity(city)).to.deep.equal([improvement]);
  });
});
