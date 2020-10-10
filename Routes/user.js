//set up express
const express = require("express");
const passport = require("passport")
const routes = express.Router();



//
let msgs;
//login page

routes.get("/login", (req, res) => {
    res.render("login",{ message: req.flash("msg"), errormsg : req.flash("error"), logout : req.flash("logoutmsg"), logouterror: req.flash("logoutmsgerror")})
})

//get bcrypt
const bcrypt = require("bcryptjs");


//get the model
const User = require("../models/User");
const passportconfig = require("../config/passport");




//post request 
routes.post("/register", (req, res) => {
    const { name, email, password, password2 } = req.body;

    let errors = [];

    //validation

    //check if all field are filled
    if (!name || !email || !password || !password2) {
        errors.push({ msg: "please fill in all fields" });
    }
    //check if passwords match
    if (password !== password2) {
        errors.push({ msg: "Passwords do not match" });

    }
    //to check if pass length is more than 6
    if (password.length < 6) {
        errors.push({ msg: "Password length should be minimum 6 characters" });

    }
    if (errors.length > 0) {

        res.render("register", {
            errors,
            email,
            password,
            password2
        })

    }
    else {
        User.findOne({ email: email })
            .then(user => {
                if (user) {
                    errors.push({ msg: "Email Id is already registered" })
                    //user already exits
                    res.render("register", {
                        errors,
                        name,
                        email,
                        password,
                        password2
                    })
                }
                else {
                    const newUser = new User({
                        name,
                        email,
                        password,

                    })
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err,hash) => {
                            if(err) throw err;
                            //set password to hasg
                            newUser.password = hash;
                            //save user
                            newUser.save()
                            .then((user)=>{
                                req.flash("msg","You are now Registered and can log in")
                                res.redirect("../users/login")
                            })
                            .catch((err)=>{
                                console.log(err);
                            })


                        })

                    })

                }

            });
    }





})

//post

routes.post('/login',(req,res,next) =>{
   passport.authenticate('local',{
    successRedirect: '../dashboard',
    failureRedirect: '/users/login',
    failureFlash:true
   })(req,res,next);
})

//Logout
routes.get("/logout",(req,res)=>{
    req.logOut();
    req.flash("logoutmsg","you are succesfully logged out")
    res.redirect('../users/login');

})


//export this file
module.exports = routes; 