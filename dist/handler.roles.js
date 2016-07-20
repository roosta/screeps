const _ = require('lodash');
const harvester = require('./role.harvester');
const upgrader = require('./role.upgrader');
const builder = require('./role.builder');
const fixer = require('./role.fixer');
module.exports = {
  run: function run() {
    _.forEach(Game.creeps, (creep) => {
      let role = require(creep.memory.role);
      role.run(creep);
    });
  },
};
