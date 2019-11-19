const express = require('express');
const path = require('path');
const morgan = require('morgan');
const multer = require('multer');
const uuid = require('uuid/v4');
const { format } = require('timeago.js');
const routes = require('./routes/index');
const body_parser=require('body-parser');
const session = require("express-session");
const cookieParser = require('cookie-parser');

//Initializations
const app = express();

app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'pug');
app.use(body_parser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(session({
    secret: 'ssshhhhh',
    saveUninitialized: false,
    resave: true
}));

//app.use('/', routes);
//app.use(express.static('public'));

//Settings

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/img/uploads'),
    filename: (req, file, cb, filename) => {
        cb(null, uuid() + path.extname(file.originalname));
    }
});
app.use(multer({
    storage: storage
}).single('image'));

// Global Variables
app.use((req, res, next) => {
    app.locals.format = format;
    next();
});

// Routes
app.use(require('./routes/index'));

// Static Files
app.use(express.static(path.join(__dirname, 'public')));


module.exports = app;