const bcrypt = require('bcrypt');
const saltRounds = 10;

const Encoder = {
     encode: async function(password, callback) {
       await bcrypt.hash(password, saltRounds, function (err, hash) {
             return callback(hash);
        });
    },
    compare: async (plainPassword, hashedPassword, callback) => {
        bcrypt.compare(plainPassword, hashedPassword, function (err, resultHash) {
            return callback(resultHash);
        });
    }
};

module.exports = Encoder;
