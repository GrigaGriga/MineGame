'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'q',
          email: 'q@q',
          password: await bcrypt.hash('111111', 10),
        },
        {
          name: 'w',
          email: 'w@w',
          password: await bcrypt.hash('111111', 10),
        },
      ],
      {},
    );
    await queryInterface.bulkInsert(
      'Stats',
      [
        {
          userId: 1,
          points: 1111,
        },
      ],
      {},
    );
    await queryInterface.bulkInsert(
      'Themes',
      [
        {
          title: 'First theme',
        },
        {
          title: 'Second theme',
        },
        {
          title: 'Third theme',}
      ],
      {},
    );
    await queryInterface.bulkInsert(
      'Questions',
      [
        {
          question: 'Is it cool?',
          answer: 'Yes',
          point: 100,
          themeId: 1,
        },
        {
          question: 'Is it cool?',
          answer: 'Yes',
          point: 100,
          themeId: 1,
        },
        {
          question: 'Is it cool?',
          answer: 'Yes',
          point: 100,
          themeId: 1,
        },
        {
          question: 'Is it cool?',
          answer: 'Yes',
          point: 100,
          themeId: 2,
        },
        {
          question: 'Is it cool?',
          answer: 'Yes',
          point: 100,
          themeId: 3,
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
