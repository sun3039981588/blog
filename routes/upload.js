var express = require('express');
var fs = require('fs');
var router = express.Router();
var multer = require('multer');

var User = require('../modules/db/user');

var uploadImg = './public/plc/'
var headName 
var stro = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,uploadImg)
    },
    filename:function(req,file,cb){
        // console.log(file)
        var arr = file.originalname.split('.')
        var exid = arr[arr.length-1]
        headName = req.session.user.username +'-'+Date.now()+'.'+exid
        cb(null,headName)
    }
})

var upload = multer({
    storage:stro,
    limits:{
        fileSize:1024*1024*100
    },
    fileFilter:function(req,file,cb){
        if(file.mimetype.startsWith('image')){
            cb(null,true)
        }else{
           cb('图片上传失败',false)
        }
    }
})

router.post('/upload',upload.single('xztx'),(req,res)=>{

      var showurl = '/plc/'+headName
      if(fs.existsSync(uploadImg+headName)){
          User
          .findOne({_id:req.session.user._id})
          .exec((err,data)=>{
            console.log(data)
              if(data.headr != '/plc/007.png'){
                  fs.unlinkSync('./public'+data.headr)
              }
              data.headr = showurl
              data.save(()=>{
                  req.session.user.headr = showurl
                  res.redirect('/')
                  console.log(data)
              })
          })
      }else{
          res.send('上传失败')
      }
})










module.exports = router;