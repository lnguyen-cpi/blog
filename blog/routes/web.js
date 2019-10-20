var home = require("../app/controllers/home");
var user = require("../app/controllers/user");
var skill = require("../app/controllers/skills");
// var paginate = require('express-paginate');


module.exports = function(app, passport) {

    // keep this before all routes that will use pagination
    //app.use(paginate.middleware(10, 50));
    
    app.group("/admin", (app) => {
        app.get('/*', (req, res, next) => {
            if(req.session.user) {
                res.locals.usernameGolbal = req.session.user;
            }
            next();
        });
        app.get("/home", isLoggedIn, home.home);
        app.get('/user',isLoggedIn,  user.index);


        // manage skills
        app.get('/skill', isLoggedIn, skill.index);

        app.get('/skill/add', isLoggedIn, skill.add);

        app.post('/handle-add-skill', isLoggedIn, skill.handle);

        app.get('/skill/edit/:id', isLoggedIn, skill.edit);
        app.post('/skill/edit/:id', isLoggedIn, skill.handleEdit);

        app.get('/skill/deactivate/:id', isLoggedIn, skill.deacitve);
        app.post('/skill/deactive-skill', isLoggedIn, skill.deacitveSkill);

        // show the login form
        app.get('/login', home.login);

        // show update form
        app.get('/update', home.update);

      
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : 'admin/home', // redirect to the secure profile section
        failureRedirect : 'admin/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }),
        function(req, res) {
            if (req.body.remember) {
                req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
                req.session.cookie.expires = false;
            }
        res.redirect('admin/home');
    });

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    // app.get('/signup', );

    // process the signup form
    // app.post('/signup', passport.authenticate('local-signup', {
    //     successRedirect : '/dashboard', // redirect to the secure profile section
    //     failureRedirect : '/signup', // redirect back to the signup page if there is an error
    //     failureFlash : true // allow flash messages
    // }));

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        req.session.destroy(); // delete session in database
        res.redirect('admin/login');
    });

 };
 
// route middleware to make sure
function isLoggedIn(req, res, next) {
 
     // if user is authenticated in the session, carry on
     if (req.isAuthenticated()) {
         return next();
     }
 
     // if they aren't redirect them to the home page
     res.redirect('/admin/login');
}