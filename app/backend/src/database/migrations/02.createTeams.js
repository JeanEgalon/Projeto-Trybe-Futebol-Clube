module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('teams', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      team_name: Sequelize.STRING,
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('teams');
  },
};