var home = require("../frontend/controllers/user-home");


module.exports = function(app, passport) {
    
    // Get to home Page
    app.get('/home', home.home);
    app.get('/', home.home);
}