const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;


router.post('/', (req, res) => {
    const { user_name , password } = req.body;
    bcrypt.hash(password, saltRounds).then((hash) => {
        const user = new User({
            user_name,
            password: hash
        });
        const promise = user.save();
        promise.then((data) => {
            res.json(data);
        }).catch((err) => {
            res.json(err);
        });
    });

});

router.get('/users',(req,res)=> {
    const promise = User.find({});
    promise.then((users)=> {
        res.json(users);
    }).catch((err)=> {
        res.json(err);
    });
});

module.exports = router;