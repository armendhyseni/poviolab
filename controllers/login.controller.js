const db = require('../models');
const jwt = require('../security/jwt-utils');
const Users = db.Users;
const encoder = require('../security/password.encoder');

exports.signup = async (req, res) => {
    const requestUser = req.body;

    const checkUser = await Users.findOne({where: {username: requestUser.username}});
    if (checkUser !== null) {
        res.status(409).json({message: 'Username already exists'});
    } else {
        await encoder.encode(requestUser.password, (hash) => {
            requestUser.password = hash;
            const insertUser = Users.build(requestUser);
            insertUser.save().then(() => {
                res.status(200).json({message: 'User created successfully'});
            }).catch((error => {
                res.status(500).json({message: error});
            }));
        }).catch(()=>{
            res.status(500).json({message: "error"});
        })
    }
};

exports.login = async (req, res) => {
    const requestUser = req.body;
    const checkUser = await Users.findOne({where: {username: requestUser.username}});
    if (checkUser === null) {
        res.json({status: 409, message: 'Incorrect username or password'});
    } else {
        await encoder.compare(requestUser.password, checkUser.password, (resultHash) => {
            if (resultHash) {
                jwt.generateToken(checkUser.get({plain: true})).then((token) => {
                    res.json({status: 200, message: token})
                }).catch((error) => {
                    res.json({status: 200, message: error})
                });
            } else {
                res.json({status: 409, message: 'Incorrect username or password'});
            }
        });
    }
};

exports.me = async (req, res) => {
    const requestUser = req.body;
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token).then((loggedUser) => {
        res.json(loggedUser)
    }).catch((error) => {
        res.json({status: 401, message: 'Token expired'})
    })
};

exports.changePassword = async (req, res) => {
    const requestUser = req.body;
    const loggedUser = await jwt.verify(req.headers.authorization.split(' ')[1]);
    const userDb = await Users.findOne({where: {id: loggedUser.id}});
    let hashedPassword = await new Promise((resolve, error) => {
        bcrypt.compare(requestUser.oldPassword, userDb.password, function (err, resultHash) {
            resolve(resultHash);
        });
    });

    if (hashedPassword) {
        hashedPassword = await new Promise((resolve, error) => {
            bcrypt.hash(requestUser.newPassword, 10, function (err, resultHash) {
                resolve(resultHash);
            });
        });

        userDb.password = hashedPassword;
        await userDb.save();
        if (userDb) {
            res.json({status: 200, message: "Password change successfully"});
        } else {
            res.json({status: 500, message: "Fail to update"})
        }
    } else {
        res.json({status: 201, message: "Old password incorrect"});
    }
};
