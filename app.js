var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = require('./router/index');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var session = require('express-session');
var flash = require('connect-flash');



app.listen(3010, function(){
    console.log('3010 포트 가동');
});

app.use(express.static('public'));      
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine', 'ejs');

app.use(session({
    secret: 'keyboard cat',
    resave:false,
    saveUninitialized:true
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(router);





