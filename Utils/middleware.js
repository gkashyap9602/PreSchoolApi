
const express = require('express');
const mongoose = require('mongoose')

const mongoDBErrors = require('mongoose-mongodb-errors')
mongoose.plugin(mongoDBErrors)

exports.errCreate = errCreate
exports.routeErr = routeErr;


function errCreate(req,res,next){
    req.status = 404;
    const err = new Error('route not found')
     next(err)
}

function routeErr(err,req,res,next){
    console.log(err,"err");
    if (err.name === 'ValidationError' || err.code === 11000 ||  req.status === 404) {
        // Duplicate username
        res.status(req.status || 500).json({
          message:err.message,
          Status_Code :req.status 
        })
      }else{
        res.status(req.status || 500).json({
          message:err,
          Status_Code :req.status
         })
      }

    // res.locals.message == err.message
    // res.locals.error = req.app.get('env') === 'development' ? err : {}
// res.status(req.status || 500).json({message:err.message,})
//jh
}