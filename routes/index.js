    var express = require('express')
    var router = express.Router()


    var User = require('../modules/db/user');
    var Reply = require('../modules/db/reply')
    var Mosge = require('../modules/db/monges')
    var tools = require('../modules/tools')

// 博客首页
router.get('/',(req,res)=>{
    var page = (req.query.page || 1)*1
    var show_count = 5
    Mosge
    .find()
    .populate('author')
    .populate('replys')
    .skip((page-1)*show_count)
    .limit(show_count)
    .sort({_id:-1})
    .exec((err,data)=>{
        var msgs = JSON.parse(JSON.stringify(data))
        Mosge.countDocuments((err,count)=>{
           var all =  Math.ceil(count/show_count)
           res.render('index',{
            msgs:msgs,
            all,
            page,
            show_count
        })
        })
      
        // console.log(msgs)
    })
})

// 跳转发布界面
router.get('/fb',(req,res)=>{
    res.render('fabu')
})
// 发布消息
router.post('/fb',(req,res)=>{
    var msg = new Mosge({
        headline:req.body.bt,
        label:req.body.bq,
        time:{
            year:new Date().getFullYear(),
            Seconds:tools.dateFormat(new Date())
        },
        content:req.body.msg,
        count:0,
        replys:[],
        author:req.session.user._id
    })
    msg.save(err=>{
        res.redirect('/')        
    })
})


// 搜索
router.get('/sousuo',(req,res)=>{
    var page = (req.query.page || 1)*1
    var show_count = 5
    Mosge
    .find({
        $or:[
            {headline:{$regex:req.query.name,$options:'$i'}},
            {content:{$regex:req.query.name,$options:'$i'}},
            {label:{$regex:req.query.name,$options:'$i'}}
        ]
    })
    .populate('author')
    .populate('replys')
    .skip((page-1)*show_count)
    .limit(show_count)
    .sort({_id:-1})
    .exec((err,data)=>{
        var msgs = JSON.parse(JSON.stringify(data))
        Mosge.countDocuments((err,count)=>{
            var all =  Math.ceil(count/show_count)
            res.render('sousuo',{
             msgs:msgs,
             all,
             page,
             show_count
         })
         })
    })


})






// 渲染作者个人主页信息
router.get('/zzzy',(req,res)=>{
    User
    .find({_id:req.session.user._id})
    .exec((err,data)=>{
        console.log(data)
        res.render('zzzy',{data})
    })

})

// 用户个人博客列表展示
router.get('/gr/:_id',(req,res)=>{
    var page = (req.query.page || 1)*1
    var show_count = 5
    Mosge
    .find({author:req.params._id})
    .populate('author')
    .populate('replys')
    .skip((page-1)*show_count)
    .limit(show_count)
    .sort({_id:-1})
    .exec((err,data)=>{
        var data = JSON.parse(JSON.stringify(data))
        Mosge.countDocuments({author:req.params._id},(err,count)=>{
            console.log(count)
            var all =  Math.ceil(count/show_count)
            res.render('grbk',{
             data:data,
             all,
             page,
             show_count
         })
         })

    })
 })
 
 
// 渲染回复页面
router.get('/huifu/:_id',(req,res)=>{
    Mosge
    .findOne({_id:req.params._id})
    .populate('author')
    .populate('replys')
    .exec((err,data)=>{
        var mas = JSON.parse(JSON.stringify(data))
        Mosge.updateOne({_id:req.params._id},{
            count:mas.count+1
        },(err)=>{
            res.render('huifu',{
                mas,
            })
        })

    })
})




// 回复页面回复消息
router.post('/huifu/:_id',(req,res)=>{
    var reply = new Reply({
        username:req.session.user.username, 
        contene:req.body.replys,
        time:tools.dateFormat(new Date())
    })
    // console.log(req.body._id)
    reply.save(err=>{
        Mosge
        .findOne({_id:req.params._id})
        .exec((err,data)=>{
            data.replys.push(reply._id)
            data.save(err=>{
                // console.log(data)
                res.redirect(req.params._id)
            })
        })
    })
})   


// 跳转编辑页面
router.get('/bj/:_id',(req,res)=>{
    Mosge.findOne({_id:req.params._id},(err,data)=>{
        // console.log(data)
        var data = JSON.parse(JSON.stringify(data))
        res.render('bianji',{data})
    })
})


// 编辑后跳回首页
router.post('/sr/:_id',(req,res)=>{
    Mosge
    .updateOne({_id:req.params._id},{
        content:req.body.msg
    },err=>{
        res.redirect('/')
    })
})

// 删除数据
router.get('/del/:_id',(req,res)=>{
    Mosge
    .deleteOne({_id:req.params._id},err=>{
        res.redirect('/')
    })
})


// 标签展示列表
router.get('/bbq/:name',(req,res)=>{
    var name = req.params.name
    Mosge
    .find({label:req.params.name})
    .populate('author')
    .populate('replys')
    .exec((err,data)=>{
        // var Ytime = data.time.section.subStr(1,4)
        var data = JSON.parse(JSON.stringify(data))
        res.render('bqzs',{
            data, 
            name            
        })
    })
})









module.exports = router;