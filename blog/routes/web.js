var home = require("../app/controllers/home");



module.exports = function(app, passport) {
    
            // =====================================
            // HOME PAGE (with login links) ========
            // =====================================
            //  app.get('/home', home.home);
            //  app.get('/admin/home', home.home);
            //  app.get('/', home.home);


            app.group("/admin", (app) => {
                app.get('/*', (req, res, next) => {
                    if(req.session.user) {
                        res.locals.usernameGolbal = req.session.user;
                    }
                    next();
                });

            

            app.get("/home", isLoggedIn, home.home);

            // =====================================
            // LOGIN ===============================
            // =====================================
            // show the login form
            app.get('/login', home.login);

            // process the login form
            app.post('/login', passport.authenticate('local-login', {
                successRedirect : 'home', // redirect to the secure profile section
                failureRedirect : 'admin/login', // redirect back to the signup page if there is an error
                failureFlash : true // allow flash messages
            }),
                function(req, res) {
                    if (req.body.remember) {
                        req.session.cookie.maxAge = 1000 * 60 * 3;
                    } else {
                        req.session.cookie.expires = false;
                    }
                res.redirect('/');
            });
    
            // =====================================
            // SIGNUP ==============================
            // =====================================
            // show the signup form
            //app.get('/signup', );
    
            // process the signup form
            // app.post('/signup', passport.authenticate('local-signup', {
            //     successRedirect : '/dashboard', // redirect to the secure profile section
            //     failureRedirect : '/signup', // redirect back to the signup page if there is an error
            //     failureFlash : true // allow flash messages
            // }));
    
            // =====================================
            // DASHBOARD SECTION =========================
            // =====================================
            // we will want this protected so you have to be logged in to visit
            // we will use route middleware to verify this (the isLoggedIn function)
            //app.get('/dashboard', isLoggedIn, dashboard.index);
    
    
            // =====================================
            // LOGOUT ==============================
            // =====================================
            app.get('/logout', function(req, res) {
                req.logout();
                req.session.destroy(); // delete session in database
                res.redirect('/');
            });


        })
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