const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('./routes/login.routes')(app);
require('./routes/users.routes')(app);
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
module.exports = app;
