import dotenv from "dotenv";
import passport from "passport";
import strategy from "passport-facebook";
import {handleOAuthAuthentication} from './../../services/authService.js'

const FacebookStrategy = strategy.Strategy;
const passportFace = passport;

dotenv.config();

passportFace.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      enableProof: true,
      profileFields: ['id', 'displayName', 'photos', 'email']
    },

    async (accessToken, refreshToken, profile, done) => {
      handleOAuthAuthentication(profile, 'facebook', done);
    }
  )
);

passportFace.serializeUser(function(user, done) {
    done(null, user);
});

passportFace.deserializeUser(function(obj, done) {
    done(null, obj);
});

export {passportFace}; 
