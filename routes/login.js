var express = require('express')
var md5 = require('md5');
var User = require('../modules/db/user');
var router = express.Router()


router.get('/login',(req,res)=>{
    res.render('login')
})
router.post('/login',(req,res)=>{
    User.findOne({username:req.body.username},(err,user)=>{
        if (!user) {
            req.flash('error','用户名不存在');
            res.redirect('/login');
        } else {
            if (md5(req.body.password) == user.password) {
                req.session.user = user;
                res.redirect('/');
            } else {
                req.flash('error','密码错误');
                res.redirect('/login');
            }
        }
    });
});


module.exports = router;