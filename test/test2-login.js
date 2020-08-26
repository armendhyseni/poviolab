let chai = require("chai");
let chaiHttp = require("chai-http");
let app = require("../index");
let should = chai.should();
const db = require('../models');
const Users = db.Users;
const UsersLikes = db.UsersLikes;

chai.use(chaiHttp);

let defaultUser = {
    username: "user1",
    password: "123123"
};

let unRegisterdUser = {
    username: "user5",
    password: "123123"
};

let token;

describe('Test login and get logged user info', async function () {
    //This function call login endpoint to check if user is valid as return accept token
    beforeEach(done => {
        chai
            .request(app)
            .post("/login")
            .send(defaultUser)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                token = "Bearer " + res.body.message;
                done();
            });
    });

    describe("/me", () => {
        it("it should login and get user logged info", done => {
            chai
                .request(app)
                .get("/me")
                .set("Authorization", token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    done();
                });
        });

        it("it should change password of logged user", done => {
            chai
                .request(app)
                .post("/me/change-password")
                .set("Authorization", token)
                .send({
                    "oldPassword": "123123",
                    "newPassword": "123456"
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    done();
                });
        });
    });
});

describe('Test login with unregistered user', async function () {
    //This function call login endpoint to check if user is valid as return accept token
    beforeEach(done => {
        chai
            .request(app)
            .post("/login")
            .send(unRegisterdUser)
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.be.a("object");
                if (res.status === 401) {
                    token = null;
                }

                done();
            });
    });

    describe("/me", () => {
        it("it should return unauthorized status", done => {
            chai
                .request(app)
                .get("/me")
                .set("Authorization", token)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.a("object");
                    done();
                });
        });
    });

});
