module.exports = (app) => {
    const userController = require('../controllers/user.controller');
    const jwt = require('../security/jwt-utils');

    app.get("/user/:id", userController.usersLikes);
    app.put("/user/:id/like", jwt.authenticateToken, userController.userLike);
    app.delete("/user/:id/unlike", jwt.authenticateToken, userController.userUnLike);
    app.get("/most-liked", userController.mostLiked);
}
