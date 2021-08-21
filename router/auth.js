const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../config/passport')(passport)

router.get('/auth/google',
passport.authenticate('google', { scope: ['profile','email'] }));

router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/dashboard');
  });
  
router.get('/verify', (req, res) => {
  if(req.user){
    res.send(req.user)
  }else{
    res.send('not authiticated')
  }
})  
router.get('/auth/logout',(req,res)=>{
  req.logout()
  res.redirect('/')
})

module.exports=router


// for react


// router.get('/auth/google/callback',function(req, res, next) {
//   passport.authenticate('google', { failureRedirect: '/',failureFlash:true }, function(err, user, info) {
//     console.log('hey',user,info)
//     res.redirect('/a')
//   })(req, res, next);
   
//   }); 
