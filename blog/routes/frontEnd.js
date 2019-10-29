var home = require("../frontend/controllers/user-home");


module.exports = function(app, passport) {
    
    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/home', home.home);
    app.get('/', home.home);

    // MY SKILLS 
    app.get('/mySkills', (req, res) => {
        res.render('myskill.ejs');
    });

     // MY PROFILE
     app.get('/myProfile', (req, res) => {
        res.render('myProfile.ejs');
    });

    // REGISTER
    app.get('/register', home.register);

    // INDEX PAGE FOR USER
    // app.get('/user/index', home.indexBlog);

    // HANDLE POST REGISTER
    app.post('/register', passport.authenticate('user-signup', {
        successRedirect : '/admin/user', // redirect to the secure profile section
        failureRedirect : '/register', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // HANDLE POST REGISTER
    app.post('/login', passport.authenticate('user-login', {

        successRedirect: "/admin/user",
        failureRedirect: "/login",
        failureFlash : true
    }))

}