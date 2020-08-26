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
    password: "123456"
};

let token;

describe('Tests for user like and unlike', async function () {
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

    describe("/user/like", () => {
        it("it should like user2", done => {
            chai
                .request(app)
                .put("/user/2/like")
                .set("Authorization", token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    done();
                });
        });

        it("it should prevent liking twice", done => {
            chai
                .request(app)
                .put("/user/2/like")
                .set("Authorization", token)
                .end((err, res) => {
                    res.should.have.status(409);
                    res.body.should.be.a("object");
                    done();
                });
        });
    });
});
