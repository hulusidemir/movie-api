const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/authenticate', (req,res)=> {
const {user_name , password} = req.body;

  User.findOne({
    user_name
  },(err,user)=>{
    if(err)
      throw err;
    if(!user){
      res.json({status: false, message:'User Not Found!!!!'});
    }else {
      bcrypt.compare(password,user.password).then((result)=>{
        if(!result) {
          res.json({
            status: false,
            message: 'Login Error ! Password is Wrong'
          });
        }else {
          const payload = {
            user_name
          };
          const token = jwt.sign(payload, req.app.get('api_secret_key'),{expiresIn: 720});
          res.json({
            status: true,
            token,
            kullanici: user.user_name,
            sifre: user.password

          });
        }
      });
    }
  })
})
module.exports = router;
