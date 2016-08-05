var user = require("./usercontroller.js");

module.exports = function(app) {
    user.setup(app);
};