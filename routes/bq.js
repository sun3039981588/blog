var express = require('express')
var router = express.Router()


var User = require('../modules/db/user');
var Reply = require('../modules/db/reply')
var Mosge = require('../modules/db/monges')
var tools = require('../modules/tools')




router.get('/bq',(req,res)=>{
    var tos = []
    Mosge
    .find()
    .exec((err,data)=>{
       data.forEach((msg)=>{
           msg.label.forEach(mag=>{
               tos.push(mag)
           })      
       })
       var top = tools.arrFormat(tos)
       res.render('biaoqian',{top})
    })
})




module.exports = router;