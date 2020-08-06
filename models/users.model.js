module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define('users', {
        firstname: {
            type: Sequelize.STRING
        },
        lastname: {
            type: Sequelize.STRING
        },
        username: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        }
    }, {timestamps: false})

    return Users;
}
