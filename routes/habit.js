var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');

router.post('/new', function(req,res,next){
  //this is where we add the new habit to the database
  // req.body.user = the user
  // req.body.name = new habit
  User.findOne({})
})
