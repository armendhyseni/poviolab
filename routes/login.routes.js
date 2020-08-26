module.exports = (app) => {
    const loginController = require('../controllers/login.controller');
    const jwt = require('../security/jwt-utils');

    app.put('/signup', loginController.signup);
    app.post('/login', loginController.login);
    app.get('/me', jwt.authenticateToken, loginController.me);
    app.post('/me/change-password', jwt.authenticateToken, loginController.changePassword);
}

