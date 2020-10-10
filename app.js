//set up express
const express = require("express");
const app = express();



//require passport
const passport = require("passport");


//passport config
require("./config/passport")(passport);



//request session and flash
const session = require("express-session");
const flash  = require("connect-flash");


//setup PORT
const PORT = process.env.PORT || 8000;



//connect to mongoose
const mongoose = require("mongoose");

const db = require("./config/keys").mongoURI;

//connect to db
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("connected to db")
    })
    .catch(err => {
        console.log(err)
    })

//body parser
app.use(express.urlencoded({ extended: false }))


//setup session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))




//passport middleware
app.use(passport.initialize());
app.use(passport.session());


//use flash
app.use(flash());

//localhost
app.set("port",PORT);


//set up ejs
app.set("view engine", "ejs")

//require Routes
const routes_index = require("./Routes/index")
const routes_user = require("./Routes/user")

app.use("/", routes_index);
//Register page
app.get("/users/register", (req, res) => {
    res.render("register")
})
app.use("/users", routes_user)

app.listen(PORT, () => {
    console.log("started");
});