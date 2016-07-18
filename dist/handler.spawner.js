/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('handler.spawner');
 * mod.thing == 'a thing'; // true
 */
const _ = require('lodash');
const harvesterCount = 3;
const upgraderCount = 3;
const builderCount = 3;
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

  run: function run() {
    let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester');
    let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role === 'upgrader');
    let builders = _.filter(Game.creeps, (creep) => creep.memory.role === 'builder');

    console.log(`Harvesters: ${harvesters.length}`);
    console.log(`Upgraders: ${upgraders.length}`);
    console.log(`Builders: ${builders.length}`);

    if (harvesters.length < harvesterCount) {
      let newName = Game.spawns.Spawn1.createCreep(
        [WORK, CARRY, MOVE],
        undefined,
        { role: 'harvester' }
      );
      if (newName > -1) {
        console.log(`Spawning new harvester: ${newName}`);
      }
    } else if (upgraders.length < upgraderCount) {
      let newName = Game.spawns.Spawn1.createCreep(
        [WORK, CARRY, MOVE],
        undefined,
        { role: 'upgrader' }
      );
      if (newName > -1) {
        console.log(`Spawning new upgrader: ${newName}`);
      }
    } else if (builders.length < builderCount) {
      let newName = Game.spawns.Spawn1.createCreep(
        [WORK, CARRY, MOVE],
        undefined,
        { role: 'builder' }
      );
      if (newName > -1) {
        console.log(`Spawning new builder: ${newName}`);
      }
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
