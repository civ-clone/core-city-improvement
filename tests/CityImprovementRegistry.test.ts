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

  it('should give a destroyed improvement too, when asked to include destroyed ones', async (): Promise<void> => {
    const ruleRegistry = new RuleRegistry(),
      registry = new CityImprovementRegistry(),
      city = await setUpCity('city', ruleRegistry),
      destroyed = new CityImprovement(city, ruleRegistry),
      kept = new CityImprovement(city, ruleRegistry);

    registry.register(destroyed, kept);
    destroyed.destroy();

    expect(registry.getByCity(city, true)).to.deep.equal([destroyed, kept]);
    expect(registry.getByCity(city, false)).to.deep.equal([kept]);
  });

  describe('getByType', (): void => {
    class Improvement extends CityImprovement {}
    class OtherImprovement extends CityImprovement {}
    class SubImprovement extends Improvement {}

    it('should give the improvements of exactly that type, in any city, in the order they were registered', async (): Promise<void> => {
      const ruleRegistry = new RuleRegistry(),
        registry = new CityImprovementRegistry(),
        city = await setUpCity('city', ruleRegistry),
        otherCity = await setUpCity('other', ruleRegistry),
        first = new Improvement(otherCity, ruleRegistry),
        other = new OtherImprovement(city, ruleRegistry),
        sub = new SubImprovement(city, ruleRegistry),
        second = new Improvement(city, ruleRegistry);

      registry.register(first, other, sub, second);

      expect(registry.getByType(Improvement)).to.deep.equal([first, second]);
      expect(registry.getByType(OtherImprovement)).to.deep.equal([other]);
      expect(registry.getByType(SubImprovement)).to.deep.equal([sub]);
      expect(registry.getByType(CityImprovement)).to.deep.equal([]);
    });

    it('should leave out a destroyed improvement, unless asked to include destroyed ones', async (): Promise<void> => {
      const ruleRegistry = new RuleRegistry(),
        registry = new CityImprovementRegistry(),
        city = await setUpCity('city', ruleRegistry),
        destroyed = new Improvement(city, ruleRegistry),
        standing = new Improvement(city, ruleRegistry),
        lost = new OtherImprovement(city, ruleRegistry);

      registry.register(destroyed, standing, lost);
      destroyed.destroy();
      lost.destroy();

      expect(registry.getByType(Improvement)).to.deep.equal([standing]);
      expect(registry.getByType(Improvement, true)).to.deep.equal([
        destroyed,
        standing,
      ]);
      expect(registry.getByType(OtherImprovement)).to.deep.equal([]);
      expect(registry.getByType(OtherImprovement, true)).to.deep.equal([lost]);
    });

    it('should forget an unregistered improvement, and find improvements registered before the lookup was first used', async (): Promise<void> => {
      const ruleRegistry = new RuleRegistry(),
        registry = new CityImprovementRegistry(),
        city = await setUpCity('city', ruleRegistry),
        improvement = new Improvement(city, ruleRegistry);

      registry.register(improvement);
      registry.unregister(improvement);

      expect(registry.getByType(Improvement, true)).to.deep.equal([]);

      registry.register(improvement);

      expect(registry.getByType(Improvement, true)).to.deep.equal([
        improvement,
      ]);
    });

    it("should not let a caller change the registry by changing what it's given", async (): Promise<void> => {
      const ruleRegistry = new RuleRegistry(),
        registry = new CityImprovementRegistry(),
        city = await setUpCity('city', ruleRegistry),
        improvement = new Improvement(city, ruleRegistry);

      registry.register(improvement);
      registry.getByType(Improvement, true).splice(0, 1);
      registry.getByType(Improvement).splice(0, 1);

      expect(registry.getByType(Improvement, true)).to.deep.equal([
        improvement,
      ]);
    });
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
