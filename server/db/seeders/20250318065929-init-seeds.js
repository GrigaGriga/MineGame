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
        { title: 'Люди Икс' },
      { title: 'Сериал Друзья' },
      { title: 'Программирование JS TS REACT REDUX' },
      { title: 'WORLD OF WARCRAFT' },
      { title: 'Боги древней Греции' },
      { title: 'Иностранные ругательства' },
      ],
      {},
    );
    await queryInterface.bulkInsert(
      'Questions',
      [
        // Тема 1: Люди Икс (themeId: 1)
      { question: 'Как зовут лидера Людей Икс?', answer: 'Чарльз Ксавьер', point: 200, isSolved: false, themeId: 1 },
      { question: 'Какой металл может нейтрализовать способности мутантов?', answer: 'Адамантий', point: 400, isSolved: false, themeId: 1 },
      { question: 'Какое настоящее имя Росомахи?', answer: 'Логан', point: 600, isSolved: false, themeId: 1 },
      { question: 'Кто создал Страйкера для охоты на мутантов?', answer: 'Церковь', point: 800, isSolved: false, themeId: 1 },
      { question: 'Какой ген отвечает за мутации в ДНК Людей Икс?', answer: 'X', point: 1000, isSolved: false, themeId: 1 },

      // Тема 2: Сериал Друзья (themeId: 2)
      { question: 'Как зовут персонажа с прической "афро"?', answer: 'Моника', point: 200, isSolved: false, themeId: 2 },
      { question: 'Какой актер играет Чендлера?', answer: 'Мэттью Перри', point: 400, isSolved: false, themeId: 2 },
      { question: 'Как называется кафешка, где работала Рэйчел?', answer: 'ЦентралПёрк', point: 600, isSolved: false, themeId: 2 },
      { question: 'Кто произносит фразу "How you doin?"?', answer: 'Джоуи', point: 800, isSolved: false, themeId: 2 },
      { question: 'Какой номер квартиры у Моники и Рэйчел?', answer: '20', point: 1000, isSolved: false, themeId: 2 },

      // Тема 3: Программирование JS TS REACT REDUX (themeId: 3)
      { question: 'Какой оператор проверяет равенство по типу и значению?', answer: '===', point: 200, isSolved: false, themeId: 3 },
      { question: 'Как называется главный конкурент React?', answer: 'Angular', point: 400, isSolved: false, themeId: 3 },
      { question: 'Какой хук React используется для побочных эффектов?', answer: 'useEffect', point: 600, isSolved: false, themeId: 3 },
      { question: 'Какой паттерн управления состоянием использует Redux?', answer: 'Flux', point: 800, isSolved: false, themeId: 3 },
      { question: 'Какой тип в TS означает "любой"?', answer: 'any', point: 1000, isSolved: false, themeId: 3 },

      // Тема 4: WORLD OF WARCRAFT (themeId: 4)
      { question: 'Как называется столица Альянса?', answer: 'Штормград', point: 200, isSolved: false, themeId: 4 },
      { question: 'Кто король Орды в классике?', answer: 'Тралл', point: 400, isSolved: false, themeId: 4 },
      { question: 'Как зовут повелителя Плети?', answer: 'Артас', point: 600, isSolved: false, themeId: 4 },
      { question: 'Какое оружие создал Торим?', answer: 'Молот', point: 800, isSolved: false, themeId: 4 },
      { question: 'Как называется измерение, где живут Древние Боги?', answer: 'Пустота', point: 1000, isSolved: false, themeId: 4 },

      // Тема 5: Боги древней Греции (themeId: 5)
      { question: 'Кто бог морей?', answer: 'Посейдон', point: 200, isSolved: false, themeId: 5 },
      { question: 'Кто бог войны?', answer: 'Арес', point: 400, isSolved: false, themeId: 5 },
      { question: 'Кто бог торговли?', answer: 'Гермес', point: 600, isSolved: false, themeId: 5 },
      { question: 'Кто бог кузнечного дела?', answer: 'Гефест', point: 800, isSolved: false, themeId: 5 },
      { question: 'Кто мать Зевса?', answer: 'Рея', point: 1000, isSolved: false, themeId: 5 },

      // Тема 6: Иностранные ругательства (themeId: 6)
      { question: 'Как будет "дурак" по-английски?', answer: 'Fool', point: 200, isSolved: false, themeId: 6 },
      { question: 'Как будет "черт" по-испански?', answer: 'Diablo', point: 400, isSolved: false, themeId: 6 },
      { question: 'Как будет "сволочь" по-немецки?', answer: 'Schwein', point: 600, isSolved: false, themeId: 6 },
      { question: 'Как будет "идиот" по-французски?', answer: 'Idiot', point: 800, isSolved: false, themeId: 6 },
      { question: 'Как будет "тварь" по-японски?', answer: 'Kisama', point: 1000, isSolved: false, themeId: 6 },
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
