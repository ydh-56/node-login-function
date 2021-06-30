var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');

// main page 는 login이 될 때만(즉 세션정보가 있을때만) 접근이 가능하게 하지
router.get('/', function(req, res) {
    var id = req.user;
    //res.sendFile(path.join(__dirname+'/public/main.html'));
    if(!id) res.render('login.ejs');
    res.render('main.ejs', {'id' : id});
});

module.exports = router;