module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('identities', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            user_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'users',
                    key: 'id'
                },
                onUpdate: 'cascade',
                onDelete: 'cascade'
            },
            provider: {
                type: Sequelize.STRING
            },
            provider_user_id: {
                type: Sequelize.STRING
            },
            name: {
                type: Sequelize.STRING
            },
            email: {
                type: Sequelize.STRING
            },
            verified: {
                type: Sequelize.BOOLEAN
            },
            score: {
                type: Sequelize.INTEGER
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE
            }
        }).then(function () {
            queryInterface.addIndex('identities', ['email'], {indicesType: 'UNIQUE'});
        });
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('identities');
    }
};
