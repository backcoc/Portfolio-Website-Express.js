const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require('bcryptjs');
const {loginValidation}= require('../validation');
const jwt = require("jsonwebtoken");


router.post("/",async (req,res)=>{
    const {error} = loginValidation(req.body);
    //if not valid
    if (error) return res.status(400).send(error.details[0].message);
    //if email exist
    const userindb= await User.findOne({email: req.body.email});
    if (!userindb) return res.status(400).send("Email or password is wrong ");
    //password check
    const validPassword = await bcrypt.compare(req.body.password, userindb.password);
    if (!validPassword) return res.status(400).send("invalid password");

    //creat and assign token
    const token = jwt.sign({_id:userindb._id}, process.env.Token_Secret)
    res.header('auth-token',token).send(token);
    
    //if everything goes good
 

});
module.exports = router;