module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('matches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      home_team: {
        allowNull: false,
        type: Sequelize.STRING(30),
        references: {
          model: 'teams',
          key: 'id'
        },
      },
      home_team_goals: {
        allowNull: false,
        type: Sequelize.STRING(30),
      },
      away_team: {
        allowNull: false,
        type: Sequelize.STRING(30),
        references: {
          model: 'teams',
          key: 'id'
        },
      },
      away_team_goals: {
        allowNull: false,
        type: Sequelize.STRING(30),
      },
      in_progress: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('matches');
  },
};