let chai = require("chai");
let expect = chai.expect;
let chaiHttp = require("chai-http");
let app = require("../index");
let should = chai.should();
const db = require('../models');
const Users = db.Users;
const UsersLikes = db.UsersLikes;

chai.use(chaiHttp);

describe('Test for user likes', async function () {
    describe("/user/like", () => {
        it("it return most liked user", done => {
            chai
                .request(app)
                .get("/most-liked")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("array");
                    done();
                });
        });

        it("it should return user likes", done => {
            chai
                .request(app)
                .get("/user/1")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("array");
                    expect(res.body).to.have.lengthOf.above(0);
                    done();
                });
        });
    });
});
