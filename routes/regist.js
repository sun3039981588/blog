var express = require('express')
var md5 = require('md5');
var User = require('../modules/db/user');
var router = express.Router()


router.get('/regist',(req,res)=>{
    res.render('regist')
})
router.post('/regist',(req,res)=>{
    User.findOne({username:req.body.username},(err,data)=>{
        if (data) {
            req.flash('error','用户名已被注册,请重新注册');
            res.redirect('/regist')
        } else {
            req.body.password = md5(req.body.password);
            req.body.respassword = md5(req.body.respassword)
            if(req.body.respassword == req.body.password){
                var user = Object.assign(req.body,{
                    headr:'/plc/007.png'
                });
                var userObject = new User(user)
                userObject.save(err=>{
                    res.render('login')
                    console.log(userObject)
                });
                console.log(user)
            }else{
                req.flash('error','两次密码不一致');
                res.redirect('/regist')
            }   
        }
    });
})

// 编辑用户信息
// router.get('/edit',(req,res)=>{
//     User
//     .findOne({_id:req.session.user._id})
//     .exec((err,data)=>{
//         // var msg = JSON.parse(JSON.stringify(data))
//         res.render('zzzy',{msg})
//         console.log(data)
//     })
// })
router.post('/edit',(req,res)=>{
    User
    .updateOne({_id:req.session.user._id},{
        email:req.body.emali,
        age:req.body.age,
        gender:req.body.gender
    },err=>{
        res.redirect('zzzy')
    })

})

router.get('/bjzy',(req,res)=>{
    res.render('grzy')
})

// 跳转到更改用户头像界面
router.get('/head-btn/:name',(req,res)=>{
    res.render('bjtx')
})


module.exports = router;