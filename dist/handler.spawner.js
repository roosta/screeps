/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('handler.spawner');
 * mod.thing == 'a thing'; // true
 */
const _ = require('lodash');
const harvesterCount = 2;
const upgraderCount = 2;
const builderCount = 2;
const fixerCount = 1;
const bodyCost = {
  move: 50,
  carry: 50,
  work: 100,
  heal: 250,
  tough: 10,
  attack: 80,
  claim: 600,
  ranged_attack: 150,
};

module.exports = {
  getBodyCost: function getBodyCost(parts) {
    let cost = 0;
    _.forEach(parts, (part) => { cost += bodyCost[part]; });
    return cost;
  },

  generateId: function generateId() {
    return Math.floor(Math.random() * (100 - 1) + 1);
  },
  run: function run() {
    let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester');
    let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role === 'upgrader');
    let builders = _.filter(Game.creeps, (creep) => creep.memory.role === 'builder');
    let fixers = _.filter(Game.creeps, (creep) => creep.memory.role === 'fixer');

    console.log(`Harvesters: ${harvesters.length}`);
    console.log(`Upgraders: ${upgraders.length}`);
    console.log(`Builders: ${builders.length}`);
    console.log(`Fixers: ${fixers.length}`);

    if (harvesters.length < harvesterCount) {
      Game.spawns.Spawn1.createCreep(
        [WORK, CARRY, MOVE, MOVE],
        `Harvester#${this.generateId()}`,
        { role: 'harvester' }
      );
    } else if (upgraders.length < upgraderCount) {
      Game.spawns.Spawn1.createCreep(
        [WORK, CARRY, MOVE, MOVE],
        `Upgrader#${this.generateId()}`,
        { role: 'upgrader' }
      );
    } else if (builders.length < builderCount) {
      Game.spawns.Spawn1.createCreep(
        [WORK, CARRY, MOVE, MOVE],
        `Builder#${this.generateId()}`,
        { role: 'builder' }
      );
    } else if (fixers.length < fixerCount) {
      Game.spawns.Spawn1.createCreep(
        [WORK, CARRY, MOVE, MOVE],
        `Fixer#${this.generateId()}`,
        { role: 'fixer' }
      );
    }
  },

  // Always place this memory cleaning code at the very top of your main loop!
  garbageCollect: function garbageCollect() {
    for (let name in Memory.creeps) {
      if (!Game.creeps[name]) {
        delete Memory.creeps[name];
        console.log('Clearing non-existing creep memory:', name);
      }
    }
  },
};
