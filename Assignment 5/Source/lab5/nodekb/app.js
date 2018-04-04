const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const config = require('./config/database');

mongoose.connect("mongodb://localhost/nodekb",{
    useMongoClient: true,
});

let db = mongoose.connection;

//check connection
db.once('open', function() {
    console.log('connected to MongoDB');

});

//check DB errors

db.on('error', function(err) {
    console.log(err);

});

//init app
const app = express();

//bring models
let Article = require('../nodekb/models/article');
//var todo = require('../app/models/todo');



// load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//bodyparser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//set public folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Session Middleware
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

// Express Messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

// Express Validator Middleware
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
            , root    = namespace.shift()
            , formParam = root;

        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg   : msg,
            value : value
        };
    }
}));

// Passport Config
require('./config/passport')(passport);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.get('*', function(req, res, next){
    res.locals.user = req.user || null;
    next();
});


// home route
app.get('/', function(req, res){

     Article.find({}, function(err, articles){
         if(err){
             console.log(err);
         }else {

             res.render('index', {
                 title: 'Articles',
                 articles: articles
             });
         }
    });
});



// Route Files
let articles = require('./routes/articles');
let users = require('./routes/users');
app.use('/articles', articles);
app.use('/users', users);

// Start Server
app.listen(3000, function(){
    console.log('Server started on port 3000...');
});





