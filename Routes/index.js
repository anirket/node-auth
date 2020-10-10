//set up express
const express = require("express");

const routes = express.Router();
const { ensureAuthenticated } = require("../config/auth")



routes.get("/",(req,res)=>{
    res.render("welcome")
})
routes.get("/dashboard",ensureAuthenticated,(req,res)=>{

    res.render("dashboard",{
        user: req.user
    })

})

//export this file
module.exports = routes;