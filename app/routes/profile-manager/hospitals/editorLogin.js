// External dependencies
const LocalStorage = require('node-localstorage').LocalStorage;
const express = require('express');
const router = express.Router();
const app = require('../../../../app');
const localStorage = new LocalStorage('./scratch');
let profiles = JSON.parse(localStorage.getItem('profilesToAdd'));

router.post('/sign-in/sign-in-start', (req, res) => {
  if (req.body.signinMethod === 'nhs') {
    res.redirect('/profile-manager/hospitals/editor-login/sign-in/nhs-signin');
  }
  res.redirect('/profile-manager/hospitals/editor-login/sign-in/non-nhs-signin');
});

router.post('/sign-in/non-nhs-signin', (req, res) => {
  res.redirect('/profile-manager/hospitals/editor-login/no-profiles-landing');
});

router.post('/register/use-system-for', (req, res) => {
  res.redirect('/profile-manager/hospitals/add-profiles/add-profile');
});

router.post('/sign-in/edit-profiles', (req, res) => {
  res.redirect('/profile-manager/hospitals/editor-login/sign-in/edit-profiles-one-org');
});

router.post('/register/start', (req, res) => {
  res.redirect('/profile-manager/hospitals/editor-login/no-profiles-landing');
});

router.post('/register/register-start', (req, res) => {
  if (req.body.signInMethod === 'nhs') {
    res.redirect('../sign-in/nhs-signin');
  }
  res.redirect('start');
});

router.post('/register/used-before', (req, res) => {
  if (req.body.usedBefore === "yes") {
    res.redirect('/profile-manager/hospitals/editor-login/register/previous-email');
  }
  res.redirect('/profile-manager/hospitals/editor-login/register/use-system-for');
});

router.post('/register/previous-email', (req, res) => {
  res.redirect('/profile-manager/hospitals/editor-login/register/confirmation-code');
});

router.post('/register/confirmation-code', (req, res) => {
  res.redirect('/profile-manager/hospitals/editor-login/transfer-profiles-complete');
});

router.post('/sign-in/nhs-signin', (req, res) => {
  res.redirect('/profile-manager/hospitals/editor-login/no-profiles-landing');
});

router.post('/add-profiles/add-profile', (req, res) => {
  const profilesToAdd = JSON.parse(localStorage.getItem('profilesToAdd'));
  let tempProfile = {
    odsCode: req.body["odsCodeValue"],
    name: req.body["org1-name"], 
    townCity: req.body["org1-town-city"], 
    postcode: req.body["org1-postcode"]
  };
  const newProfiles = [...profilesToAdd, tempProfile];
  localStorage.setItem('profilesToAdd', JSON.stringify(newProfiles));
  res.render('profile-manager/hospitals/add-profiles/add-profiles-confirm', { newProfiles });
});

router.get('/add-profiles/remove-profile', (req, res) => {
  const profiles = JSON.parse(localStorage.getItem('profilesToAdd'));
  res.render('profile-manager/hospitals/add-profiles/remove-profile', { profiles });
});

router.post('/add-profiles/remove-profile', (req, res) => {
  const profilesToAdd = JSON.parse(localStorage.getItem('profilesToAdd'));
  const newProfiles = profilesToAdd.slice(1);
  localStorage.setItem('profilesToAdd', JSON.stringify(newProfiles));
  res.render('profile-manager/hospitals/add-profiles/add-profiles-confirm', { newProfiles });
});

router.get('/add-profiles/add-profiles-complete', (req, res) => {
  localStorage.setItem('profilesToAdd', JSON.stringify([]));
  res.render('profile-manager/hospitals/add-profiles/add-profiles-complete');
})

module.exports = {
  router: router,
};