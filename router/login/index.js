var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');
var passport = require('passport')
var localStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');

var mysql = require('mysql');

var connection = mysql.createConnection({
    host:'localhost',
    port:3306,
    user:'root',
    password:'55089727',
    database:'my_login'
})
connection.connect();

router.get('/', function(req,res) {
	var msg;
	var errMsg = req.flash('error')
	if(errMsg) msg = errMsg;
	res.render('login.ejs', {'message' : msg});
});

//passport.serialize
passport.serializeUser(function(user, done) {
	console.log('passport session save : ', user.id)
  done(null, user.id)
});

passport.deserializeUser(function(id, done) {
	console.log('passport session get id: ', id)
	done(null, id);
})

passport.use('local-login', new localStrategy({
		usernameField: 'email',
	  passwordField: 'pwd',
	  passReqToCallback : true
	}, function(req, email, pwd, done) {
		var query = connection.query('select * from back_node where email=?', [email], function(err,rows) {
			if(err) return done(err);

			if(rows.length) {
				return done(null, {'email' : email, 'id' : rows[0].SEQ});
			} else {
				return done(null, false, {'message' : 'your login info is not found'});
			}
		})
	}
));

router.post('/', function(req, res, next) {
    passport.authenticate('local-login', function(err, user, info) {
        if(err){res.status(500).json(err);}
        if(!user) {return res.status(401).json(info.message)}
        
        req.logIn(user, function(err) {
            if (err) return next(err); 
            return res.json(user);
        });
    })(req, res, next)
})

// router.post('/', function(req, res){
//     var body = req.body;
//     var seq = body.seq;
//     var email = body.email;
//     var name = body.name;
//     var pwd = body.pwd;
    
//     var sql = {email: email, name:name, pwd:pwd }
//     var query = connection.query('insert into back_node set ? ',sql , function(err, rows){
//         if(err) throw err;
//         console.log('ok db insert : ', seq, name);
//         res.render('welcome.ejs',{'name':name, 'id':rows.insertId})
//     })
// })


module.exports = router;     