var express = require('express');

var app = express();
app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));
var artTemplate = require('express-art-template');
app.engine('html',artTemplate);
var artTmpEngine = require('./modules/art-tem-config');
artTmpEngine(app);

var User = require('./modules/db/user');
var Reply = require('./modules/db/reply')
var Mosge = require('./modules/db/monges')



var flash = require('connect-flash');
app.use(flash());


var md5 = require('md5');


var session = require('express-session');

var MongoStore = require('connect-mongo')(session);

app.use(session({
    secret:'mylogin',
    resave:true,
    saveUninitialized:true,
    rolling:true,
    cookie:{
        maxAge:1000*60*60
    },
    store: new MongoStore({
        url:'mongodb://127.0.0.1/boke'
    })
}));
app.use(function(req,res,next) {
    res.locals.user = req.session.user;
    res.locals.error = req.flash('error').toString();
    next();
});

// 注册 路由
var registRouter = require('./routes/regist');
app.use(registRouter)

var loginRouter = require('./routes/login');
app.use(loginRouter);

var indexRouter = require('./routes/index')
app.use(indexRouter)

var bqRouter = require('./routes/bq')
app.use(bqRouter)

var cdRouter = require('./routes/cd')
app.use(cdRouter)


var upRouter = require('./routes/upload')
app.use(upRouter)

app.get('/logout',(req,res)=>{
    req.session.user = null;
    res.redirect('/');
});




app.get('/',(req,res)=>{
    res.render('index')
})



















app.listen(3000,()=>{
    console.log('node running');
});