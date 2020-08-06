module.exports =  (sequelize, Sequelize) => {
    const Users = require('./users.model')(sequelize, Sequelize);
    const UsersLikes = sequelize.define('users_likes', {
        user_likes: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        user_liked: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
    }, {timestamps: false});
    UsersLikes.hasOne(Users, {
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
    });
    Users.belongsTo(UsersLikes);
    return UsersLikes;
};

