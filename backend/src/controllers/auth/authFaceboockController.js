// autfacebookcontrollers.js

const express = require('express');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

const app = express();

passport.use(new FacebookStrategy({
  clientID: 'process.env.FACEBOOK_CLIENT_ID,',
  clientSecret: 'process.env.FACEBOOK_CLIENT_SECRET',
  callbackURL: 'http://localhost:3000/auth/facebook/callback',
},
(accessToken, refreshToken, profile, done) => {
  // Utilisez les informations du profil pour l'authentification ou l'enregistrement dans votre base de données
  return done(null, profile);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/success', failureRedirect: '/' })
);

app.get('/success', (req, res) => {
  res.send('Connecté avec succès avec Facebook');
});

app.get('/', (req, res) => {
  res.send('Page de connexion');
});

app.listen(3000, () => {
  console.log('Serveur écoutant sur le port 3000');
});
