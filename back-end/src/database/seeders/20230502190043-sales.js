/* eslint-disable strict */
// eslint-disable-next-line lines-around-directive
'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('sales', [], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('sales', null, {});
  },
};