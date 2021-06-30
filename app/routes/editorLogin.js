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
  res.redirect('/editor-login/sign-in/used-before');
});

router.post('/sign-in/used-before', (req, res) => {
  if (req.body.usedBefore === "yes") {
    res.redirect('/editor-login/crt-home-no-profiles');
  }
  res.redirect('/editor-login/sign-in/use-system-for');
});

router.post('/sign-in/use-system-for', (req, res) => {
  if (req.body.useSystemFor === "edit") {
    res.redirect('/editor-login/sign-in/edit-profiles');
  } 
  if (req.body.useSystemFor === "respond") {
    res.redirect('/editor-login/sign-in/respond-to-comments');
  }
  if (req.body.useSystemFor === "both") {
    res.redirect('/editor-login/sign-in/edit-and-respond');
  }
});

router.post('/sign-in/edit-profiles', (req, res) => {
  res.redirect('/editor-login/sign-in/edit-profiles-one-org');
});

router.post('/register/start', (req, res) => {
  res.redirect('/editor-login/register/add-profiles-landing');
});

router.post('/register/register-start', (req, res) => {
  if (req.body.signinMethod === 'nhs') {
    res.redirect('../sign-in/nhs-signin');
  }
  res.redirect('start');
});

router.post('/sign-in/nhs-signin', (req, res) => {
  res.redirect('/editor');
});

module.exports = {
  router: router,
};