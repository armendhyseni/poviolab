let chai = require("chai");
let chaiHttp = require("chai-http");
let app = require("../index");
let should = chai.should();
const db = require('../models');
const Users = db.Users;
const UsersLikes = db.UsersLikes;

let user1 = {
    firstname: "User 1",
    lastname: "User 1",
    username: "user1",
    password: "123123"
};

let user2 = {
    firstname: "User 2",
    lastname: "User 2",
    username: "user2",
    password: "123456"
}

describe('Test for user registration',async function () {

    //First we call Modal Users to delete all users in and their likes
    before(async () => {
        await Users.destroy({
            truncate: {cascade: true, restartIdentity: true}
        });

        await db.sequelize.query(`ALTER SEQUENCE users_id_seq RESTART WITH 1`);
    });

    //This function call signin endpoint to insert new user and username doesn't exists in db
    describe('/signup', async function () {
        it("it should create a user and return status 200", done => {
            chai
                .request(app)
                .put("/signup")
                .send(user1)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    done();
                });
        });

        it("it should create another user and return status 200", done => {
            chai
                .request(app)
                .put("/signup")
                .send(user2)
                .end((err, res) => {
                    console.log(res.body);
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    done();
                });
        });

        //After successfully insert we will try to insert same username and it will fail due to username exists in db
        it("it should try to duplicate user and return status 409 conflict", done => {
            chai
                .request(app)
                .put("/signup")
                .send(user1)
                .end((err, res) => {
                    res.should.have.status(409);
                    res.body.should.be.a("object");
                    done();
                });
        });
    });
});
