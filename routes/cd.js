var express = require('express')
var router = express.Router()


var User = require('../modules/db/user');
var Reply = require('../modules/db/reply')
var Mosge = require('../modules/db/monges')
var tools = require('../modules/tools')



router.get('/cd',(req,res)=>{
   Mosge
   .find()
   .sort({time:-1})
   .exec((err,data)=>{
       var data = JSON.parse(JSON.stringify(data))
       res.render('cd',{
           data,
           lastYear:-1,
       })

   })

    
 
})














module.exports = router;