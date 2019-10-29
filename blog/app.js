var express = require('express');
require('express-group-routes');

var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);

var multer = require('multer')
var constants = require('constants');
var constant = require('./config/constants');


var port = process.env.PORT || 8042;
var passport = require('passport');
var flash = require('connect-flash');
var path = require('path');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
var bodyParser = require('body-parser');
var dateFormat = require('dateformat');
var now = new Date();
var engine = require('ejs-blocks');
var expressValidator = require('express-validator');
var paginate = require('express-paginate');



// keep this before all routes that will use pagination
app.use(paginate.middleware(5, 50));

const options = {
        // Host name for database connection:
        host: 'https://www.db4free.net',
        // Port number for database connection:
        port: 3306,
        // Database user:
        user: 'nblam1994',
        // Password for the above database user:
        password: 'nblam1994',
        // Database name:
        database: 'personal_blog',
        // Whether or not to automatically check for and clear expired sessions:
        clearExpired: true,
        // How frequently expired sessions will be cleared; milliseconds:
        checkExpirationInterval: 900000,
        // The maximum age of a valid session; milliseconds:
        expiration: 86400000,
        // Whether or not to create the sessions database table, if one does not already exist:
        createDatabaseTable: true,
        // Number of connections when creating a connection pool:
        connectionLimit: 1,
        // Whether or not to end the database connection when the store is closed.
        // The default value of this option depends on whether or not a connection was passed to the constructor.
        // If a connection object is passed to the constructor, the default value for this option is false.
        endConnectionOnClose: true,
        charset: 'utf8mb4_bin',
        schema: {
            tableName: 'sessions',
            columnNames: {
                session_id: 'session_id',
                expires: 'expires',
                data: 'data'
            }
        }
};

const sessionStore = new MySQLStore(options);




// passport for admin ======================================================================
require('./config/passport')(passport, app);
require('./config/passportFrontend')(passport, app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
//app.use(bodyParser()); // get information from html forms
app.use(expressValidator());


//view engine setup
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', [path.join(__dirname, 'app/views'), path.join(__dirname, 'frontend/views')]);

// use ejs-blocks for all ejs templates:
app.engine('ejs', engine);
app.set('view engine', 'ejs');



//required for passport
app.use(session({
    secret: 'I Love India...',
    resave: true,
    saveUninitialized: true,
    store: sessionStore
}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
app.use(function(req, res, next){
    res.io = io;
    next();
})

// routes ======================================================================
require('./routes/web')(app, passport, paginate);      // load our routes related to Admin
require('./routes/frontEnd')(app, passport)  // load our routes related to Users

//launch ======================================================================
server.listen(port);
console.log('The magic happens on port ' + port);

//catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.status(404).render('404', {title: "Sorry, page not found", session: req.sessionbo});
});

app.use(function (req, res, next) {
    res.status(500).render('404', {title: "Sorry, page not found"});
});
exports = module.exports = app;