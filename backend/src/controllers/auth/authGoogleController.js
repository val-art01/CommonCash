import dotenv from 'dotenv';
import passport from 'passport';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import {handleOAuthAuthentication} from './../../services/authService.js'

dotenv.config();

const isLoggedIn = (req, res, next) => { 
    req.user ? next() : res.sendStatus(401);
}

passport.use(new GoogleStrategy
  (
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        passReqToCallback: true
    },
    async (request, accessToken, refreshToken, profile, done) => {
      handleOAuthAuthentication(profile, 'google', done);
    }
  )
);

passport.serializeUser((user, done) => {
    done(null, user);    
})

passport.deserializeUser((user, done) => {
    done(null, user)
})

export {isLoggedIn, passport};