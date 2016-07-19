const roleHarvester = require('./role.harvester');
const roleUpgrader = require('./role.upgrader');
const roleBuilder = require('./role.builder');
const roleFixer = require('./role.fixer');
const handlerSpawner = require('./handler.spawner');

module.exports.loop = function main() {
  console.log('-----TICK-----');
  handlerSpawner.garbageCollect();
  handlerSpawner.run();

  // console.log(handlerSpawner.getBodyCost([WORK,WORK, CARRY,CARRY, MOVE, MOVE,MOVE,MOVE]));

  for (let name in Game.creeps) {
    if ({}.hasOwnProperty.call(Game.creeps, name)) {
      let creep = Game.creeps[name];
      switch (creep.memory.role) {
        case 'harvester':
          roleHarvester.run(creep);
          break;
        case 'upgrader':
          roleUpgrader.run(creep);
          break;
        case 'builder':
          roleBuilder.run(creep);
          break;
        case 'fixer':
          roleFixer.run(creep);
          break;
        default:
          console.error(`fell through @ main. Include: ${creep.memory.role}?`);
      }
    }
  }
};
