var express = require('express');
var moment = require('moment');
var app = express();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var expressJwt = require("express-jwt");


var index = require('./routes/index');
var users = require('./routes/users.js');
var login = require('./routes/login');
var article = require('./routes/article');
var wechat = require('./routes/wechat');
var hero = require('./routes/hero');
var test = require('./routes/test');
var wx = require('./routes/wx');


// view engine setup
app.engine('.ejs', require('ejs').__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
var unlessPath = [
    "/",
    "/login",
    "/static",
    '/ss'
]
var expires = moment().add(7, 'seconds').valueOf();
app.use(expressJwt({ secret: "secret", exp: expires }).unless({ path: unlessPath }));

app.use('/', index);
app.use('/users', users);
app.use('/login', login);
app.use('/article', article);
app.use('/wechat', wechat);
app.use('/wx', wx);
app.use('/hero', hero);
app.use('/ss', test);

app.use(cookieParser('czc'));
app.use(session({
    secret: 'czc',
    name: 'testapp', //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    cookie: { maxAge: 80000 }, //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
    resave: false,
    saveUninitialized: true,
}));




app.use(function(err, req, res, next) {
    if (err) {
        console.log(err);

        if (err.code == "invalid_token") {
            res.status(401).send("令牌错误");
        } else if (err.code == "credentials_required") {
            res.status(401).send("无令牌");
        }
    }

});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.send({ "err": err });
});

// //api handler
// function extendApiOutPut(req,res,next){
//     res.apiSuccess = function(data){
//         res.json()
//     }
// }

module.exports = app;