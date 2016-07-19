let fixer = {
  run: function run(creep) {
    let closestDamagedStructure = creep.pos.findClosestByRange(FIND_STRUCTURES, {
      filter: (structure) => structure.hits < structure.hitsMax,
    });
    if (creep.memory.fixing && creep.carry.energy === 0 || !closestDamagedStructure) {
      creep.memory.fixing = false;
    }
    if (!creep.memory.fixing &&
        creep.carry.energy === creep.carryCapacity &&
        closestDamagedStructure) {
      creep.memory.fixing = true;
    }

    if (creep.memory.fixing) {
      if (creep.repair(closestDamagedStructure) === ERR_NOT_IN_RANGE) {
        creep.moveTo(closestDamagedStructure);
      }  
    }
    else {
      var sources = creep.room.find(FIND_SOURCES);
      if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0]);
      }
    }
  },
};

module.exports = fixer;

