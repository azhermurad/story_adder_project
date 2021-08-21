const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../model/user');

module.exports = (passport) => {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
        proxy: true
    },
        (accessToken, refreshToken, profile, done) => {
            User.findOne({ googleId: profile.id }).then((user) => {
                if(user){
                    return done(null,user)
                }else {
                    const saveUser = new User({
                        googleId: profile.id,
                        firstName: profile.name.givenName,
                        lastName: profile.name.familyName,
                        email: profile.emails[0].value,
                        image: profile.photos[0].value
                    })
                    saveUser.save().then((user)=>done(null, user))
                }
            })


            

        }
    ))
    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      });
}