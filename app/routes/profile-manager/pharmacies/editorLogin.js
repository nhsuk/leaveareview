// External dependencies
const LocalStorage = require('node-localstorage').LocalStorage;
const express = require('express');
const router = express.Router();
const app = require('../../../../app');
const localStorage = new LocalStorage('./scratch');
let profiles = JSON.parse(localStorage.getItem('profilesToAdd'));

router.post('/sign-in/sign-in-start', (req, res) => {
  if (req.body.signinMethod === 'nhs') {
    res.redirect('/profile-manager/pharmacies/editor-login/sign-in/nhs-signin');
  }
  res.redirect('/profile-manager/pharmacies/editor-login/sign-in/non-nhs-signin');
});

router.post('/sign-in/non-nhs-signin', (req, res) => {
  res.redirect('/profile-manager/pharmacies/editor-login/no-profiles-landing');
});

router.post('/register/use-system-for', (req, res) => {
  res.redirect('/profile-manager/pharmacies/add-profiles/add-profile');
});

router.post('/sign-in/edit-profiles', (req, res) => {
  res.redirect('/profile-manager/pharmacies/editor-login/sign-in/edit-profiles-one-org');
});

router.post('/register/start', (req, res) => {
  res.redirect('/profile-manager/pharmacies/editor-login/no-profiles-landing');
});

router.post('/register/register-start', (req, res) => {
  if (req.body.signInMethod === 'nhs') {
    res.redirect('../sign-in/nhs-signin');
  }
  res.redirect('start');
});

router.post('/register/used-before', (req, res) => {
  if (req.body.usedBefore === "yes") {
    res.redirect('/profile-manager/pharmacies/editor-login/register/previous-email');
  }
  res.redirect('/profile-manager/pharmacies/editor-login/register/use-system-for');
});

router.post('/register/previous-email', (req, res) => {
  res.redirect('/profile-manager/pharmacies/editor-login/register/confirmation-code');
});

router.post('/register/confirmation-code', (req, res) => {
  res.redirect('/profile-manager/pharmacies/editor-login/transfer-profiles-complete');
});

router.post('/sign-in/nhs-signin', (req, res) => {
  res.redirect('/profile-manager/pharmacies/editor-login/no-profiles-landing');
});


module.exports = {
  router: router,
};