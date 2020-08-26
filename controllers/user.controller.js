const db = require('../models');
const jwt = require('../security/jwt-utils');
const UsersLikes = db.UsersLikes;
const Users = db.Users;
const encoder = require('../security/password.encoder');

exports.mostLiked = async (req, res) => {
    db.sequelize.query("SELECT u.firstname,u.lastname,u.username FROM users u " +
        "LEFT JOIN users_likes u_l ON u.id = u_l.user_liked GROUP BY u_l.user_liked,u.id ORDER BY COUNT(user_liked) DESC", {
        type: db.Sequelize.QueryTypes.SELECT
    }).then((data) => {
        res.json(data);
    }).catch((error) => {
        res.status(500).json(error);
    });
};

exports.userLike = async (req, res) => {
    const userToBeLiked = req.params.id;
    const loggedUser = await jwt.verify(req.headers.authorization.split(' ')[1]);

    if (loggedUser !== null) {
        const checkIfUsersAlreadyLiked = await UsersLikes.findOne({
            where: {
                user_likes: loggedUser.id,
                user_liked: userToBeLiked
            }
        });

        if (checkIfUsersAlreadyLiked !== null) {
            res.status(409).json({message: "You already like this user"});
        } else {
            const newLike = {
                user_likes: loggedUser.id,
                user_liked: userToBeLiked
            };
            UsersLikes.create(newLike).then(() => {
                res.json({message: "User liked successfully!"});
            }).catch((error) => {
                res.status(500).json({message: "Cannot finish operation. Try again!"});
            })
        }
    }
};

exports.userUnLike = async (req, res) => {
    const userToBeLiked = req.params.id;
    const loggedUser = await jwt.verify(req.headers.authorization.split(' ')[1]);

    if (loggedUser !== null) {
        const checkIfUsersAlreadyLiked = await UsersLikes.findOne({
            where: {
                user_likes: loggedUser.id,
                user_liked: userToBeLiked
            }
        });

        if (checkIfUsersAlreadyLiked === null) {
            res.status(409).json({message: "You haven't liked yet this user"});
        } else {
            const likeToBeDeleted = {
                user_likes: loggedUser.id,
                user_liked: userToBeLiked
            };
            UsersLikes.destroy({where: likeToBeDeleted}).then(() => {
                res.json({message: "User un liked successfully!"});
            }).catch((error) => {
                res.status(500).json({message: "Cannot finish operation. Try again!"});
            })
        }
    }
};

exports.usersLikes = async (req, res) => {
    const userId = req.params.id;
    db.sequelize.query("SELECT u.username, COUNT(user_liked) number_of_likes FROM users u " +
        " LEFT JOIN users_likes u_l ON u.id = u_l.user_liked WHERE u.id = :id" +
        " GROUP BY u_l.user_likes,u.id ORDER BY COUNT(user_liked) DESC", {
        type: db.Sequelize.QueryTypes.SELECT,
        replacements: {id: userId},
    }).then((data) => {
        res.json(data);
    }).catch((error) => {
        res.status(500).json(error);
    });
};
