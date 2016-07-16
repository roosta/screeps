var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var handlerSpawner = require('handler.spawner');

module.exports.loop = function () {

  // Always place this memory cleaning code at the very top of your main loop!
  for(var name in Memory.creeps) {
    if(!Game.creeps[name]) {
      delete Memory.creeps[name];
      console.log('Clearing non-existing creep memory:', name);
    }
  }

  handlerSpawner.run();

  for(var name in Game.creeps) {
    var creep = Game.creeps[name];
    if(creep.memory.role == 'harvester') {
      roleHarvester.run(creep);
    }
    if(creep.memory.role == 'upgrader') {
      roleUpgrader.run(creep);
    }
  }
}
