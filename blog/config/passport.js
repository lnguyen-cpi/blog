var LocalStrategy   = require('passport-local').Strategy;

var User            = require('../app/models/home');

var bcrypt = require('bcryptjs');

var configAuth = require('./auth.js');
var constant = require('../config/constants');
var dateFormat = require('dateformat');
var fs = require('fs');

var mysql = require('mysql')

const dbconfig = require('./database');
const connection = mysql.createConnection(dbconfig.connection);
// select database - very important
connection.query(`USE ${dbconfig.database}`);


//expose this function to our app using module.exports
module.exports = function(passport, app) {

    
    
    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        connection.query("SELECT * FROM users WHERE id = ? ",[id], function(err, rows){
            done(err, rows[0]);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, done) {
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        connection.query("SELECT * FROM users WHERE username = ?",[username], function(err, rows) {
            if (err)
                return done(err);
            if (rows.length) {
                return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
            } else {
                // if there is no user with that username
                // create the user
                var newUserMysql = {
                    username: username,
                    password: bcrypt.hashSync(password, 10)  // use the generateHash function in our user model
                };
                var insertQuery = "INSERT INTO users ( username, password ) values (?,?)";
                connection.query(insertQuery,[newUserMysql.username, newUserMysql.password],function(err, rows) {
                    newUserMysql.id = rows.insertId;

                    return done(null, newUserMysql);
                    });
                }
            });
        })
    );
    
    
    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'
    
    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, done) {
            connection.query("SELECT * FROM users WHERE username = ? AND status = 1",[username], function(err, rows){
                if (err)
                    return done(err);
                if (!rows.length) {
                    return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
                }

                // if the user is found but the password is wrong
                if (!bcrypt.compareSync(password, rows[0].password)) {
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
                }
                // save data user in sesssion
                req.session.user = rows[0].username;
                req.session.id   = rows[0].id;
                req.session.role = rows[0].role;
                req.session.name = rows[0].name;

                // all is well, return successful user
                app.locals.usernameGolbal = rows[0].username;
 
                return done(null, rows[0]);
            });
        })
    );
};



module.exports.SetAdminName = async () => {

    // Can not save into session
    return new Promise((resolve, reject) =>{
        connection.query("SELECT * FROM admin", function(err, rows) {
            if (err) {
                reject(err);
                return;
            }

            if (!rows.length) {
                resolve("no admin")
                return;
            } else {
                resolve(rows[0].name);
            }
        });
    });
}

module.exports.GetSkills = async () => {


    return new Promise((resolve, reject) =>{
        connection.query("SELECT * FROM skills", function(err, rows) {

            if (err) {
                console.log(err);
                reject(null);
            }

            if (rows.length) {
                resolve(rows);
            } else {
                resolve(null);
            }
        });
    });
}

module.exports.GetAbout = async () => {

    return new Promise((resolve, reject) =>{
        connection.query("SELECT * FROM about", function(err, rows) {

            if (err) {
                console.log(err);
                reject(null);
            }

            if (rows.length) {
                resolve(rows[0]);
            } else {
                resolve(null);
            }
        });
    });
}

module.exports.GetExperience = async () => {

    return new Promise((resolve, reject) =>{
        connection.query("SELECT * FROM experience", function(err, rows) {

            if (err) {
                console.log(err);
                reject(null);
            }

            if (rows.length) {
                resolve(rows);
            } else {
                resolve(null);
            }
        });
    });
}

module.exports.GetEducation = async () => {

    return new Promise((resolve, reject) =>{
        connection.query("SELECT * FROM education", function(err, rows) {

            if (err) {
                console.log(err);
                reject(null);
            }

            if (rows.length) {
                resolve(rows);
            } else {
                resolve(null);
            }
        });
    });
}
    
    





