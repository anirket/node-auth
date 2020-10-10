const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require("bcryptjs");
const passport = require("passport");

const User = require("../models/User")


module.exports = 
    function(passport) {
        let uservalue;
        passport.use(
            new LocalStrategy({ usernameField: 'email'}, (email, password, done) => {
                User.findOne({ email: email })
                    .then((user) => {
                        uservalue = user;
                        if (!user) {
          
                           
                            return done(null, false, { message: 'That email is not registered' })
                        }

                        //match password
                        console.log(password,user.password)
                        bcrypt.compare(password, uservalue.password, (err, ismatch) => {
                            if (ismatch) {
                     
                                return done(null, uservalue)
                            }
                            else {
                      
                   
                                return done(null, false, { message: "Password incorrect" })
                            }

                        })

                    })
                    .catch((err) => {
                        console.log(err);

                    })


            }))

        passport.serializeUser(function (uservalue, done) {


            done(null, uservalue.id);

        })
        passport.deserializeUser(function (id, done) {
            User.findById(id, function (err, uservalue) {
                done(err, uservalue);
            })
        })


    }


