// External dependencies
const express = require('express');
const router = express.Router();
const app = require('../../app');

router.post('/sign-in/sign-in-start', (req, res) => {
  if (req.body.signinMethod === 'nhs') {
    res.redirect('nhs-signin');
  }
  res.redirect('non-nhs-signin');
});

router.post('/sign-in/non-nhs-signin', (req, res) => {
  res.redirect('/editor');
});

router.post('/register/start', (req, res) => {
  res.redirect('/editor-login/crt-home');
});

router.post('/sign-in/nhs-signin', (req, res) => {
  res.redirect('/editor');
});

module.exports = {
  router: router,
};