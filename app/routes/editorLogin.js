// External dependencies
const LocalStorage = require('node-localstorage').LocalStorage;
const express = require('express');
const router = express.Router();
const app = require('../../app');
const localStorage = new LocalStorage('./scratch');

// let newProfiles;
// let profiles = JSON.parse(localStorage.getItem('profilesToAdd'));

router.post('/sign-in/sign-in-start', (req, res) => {
  if (req.body.signinMethod === 'nhs') {
    res.redirect('nhs-signin');
  }
  res.redirect('non-nhs-signin');
});

router.post('/sign-in/non-nhs-signin', (req, res) => {
  res.redirect('/editor-login/sign-in/used-before');
});

router.post('/register/use-system-for', (req, res) => {
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
  res.redirect('/editor-login/register/add-profiles-non-nhs-landing');
});

router.post('/register/register-start', (req, res) => {
  if (req.body.signInMethod === 'nhs') {
    res.redirect('../sign-in/nhs-signin');
  }
  res.redirect('start');
});

router.post('/register/used-before', (req, res) => {
  if (req.body.usedBefore === "yes") {
    res.redirect('/editor-login/register/previous-email');
  }
  res.redirect('/editor-login/register/use-system-for');
});

router.post('/register/previous-email', (req, res) => {
  res.redirect('/editor-login/register/match-found');
});

router.post('/sign-in/nhs-signin', (req, res) => {
  res.redirect('/editor-login/register/add-profiles-nhs-landing');
});

router.post('/add-profiles/your-name', (req, res) => {
  res.redirect('/editor-login/add-profiles/add-profile');
});

router.post('/add-profiles/add-profile', (req, res) => {
  // let tempProfiles = Array(req.body["org1-name"], req.body["org1-town-city"], req.body["org1-postcode"]);
  // newProfiles = profiles.concat(tempProfiles);
  // console.log('profiles ', profiles)
  // console.log('tempProfiles ', tempProfiles)
  // console.log('newProfiles ', newProfiles)
  // localStorage.setItem('profilesToAdd', newProfiles);
  res.redirect('/editor-login/add-profiles/add-profiles-confirm');
});

module.exports = {
  router: router,
};