import passport from "passport";
import dotenv from "dotenv";
import strategy from "passport-facebook";

import userModel from "../user/user.model";

const FacebookStrategy = strategy.Strategy;

dotenv.config();

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      profileFields: ["id", "displaName", "email"]
    },
    function(accessToken, refreshToken, profile, done) {
      const { email, first_name, last_name } = profile._json;
      const userData = {
        email,
        firstName: first_name,
        lastName: last_name
      };
      new userModel(userData).save();
      done(null, profile);
    }
  )
);

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });
  