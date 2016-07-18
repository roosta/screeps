let proto = {
  repair: function repair(creep) {
    let closestDamagedStructure = creep.pos.findClosestByRange(FIND_STRUCTURES, {
      filter: (structure) => structure.hits < structure.hitsMax,
    });
    if (creep.memory.repairing && creep.carry.energy === 0 || !closestDamagedStructure) {
      creep.memory.repairing = false;
    }
    if (!creep.memory.repairing &&
        creep.carry.energy === creep.carryCapacity &&
        closestDamagedStructure) {
      creep.memory.repairing = true;
    }

    if (creep.memory.repairing) {
      if (creep.repair(closestDamagedStructure) === ERR_NOT_IN_RANGE) {
        creep.moveTo(closestDamagedStructure);
      } else {
        creep.repair(closestDamagedStructure);
      }
    }
  },
};

module.exports = proto;

