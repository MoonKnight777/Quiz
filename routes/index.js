var express = require('express');
var router = express.Router();
const userModel = require("./users")
const passport = require("passport")
const localStrategy = require("passport-local")

passport.use(new localStrategy(userModel.authenticate()))

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Register and Login functioning
router.post('/register', function(req, res){
  const userData = new userModel({
    username: req.body.username,
    email: req.body.email,
    fullName: req.body.fullName,
    role: req.body.role
  })

  userModel.register(userData, req.body.password)
  .then(function(){
    passport.authenticate("local")(req,res, function(){
      res.redirect("/login");
      console.log("Registration Done!1")
    })
  })
})

router.post('/login', passport.authenticate("local",{
  successRedirect : "/profile",
  failureRedirect : "/login",
  failureFlash : true
}) ,function(req, res){
})

// Login page
router.get("/login", function(req, res){
  res.render('login', {err : req.flash("error")})
})

router.get("/logout", function(req, res){
  req.logout(function(err){
    if(err) {return next(err)}
    res.redirect("/login"); 
  })
})

router.get("/profile",isLoggedIn, async function(req, res){
  const user = await userModel.findOne({
    username : req.session.passport.user
  })
  res.render("profile", {user})
})

function isLoggedIn(req, res ,next){
  if(req.isAuthenticated()) return next();
  res.redirect("/login");
}

module.exports = router;
