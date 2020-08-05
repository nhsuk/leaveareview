const LocalStorage = require('node-localstorage').LocalStorage;

// External dependencies
const express = require('express');
const router = express.Router();
const pharmacies = require('./data/pharmacies');
const moment = require('moment');
const app = require('../app');

// Create local storage for opening times
const localStorage = new LocalStorage('./scratch');

router.get('/profiles/', (req, res) => {
  let currentPharmacies = pharmacies.slice(0, 15);
  res.render('proof-of-concept/profiles/index', { currentPharmacies, pharmacies });
});

router.get('/profiles/profiles-page2', (req, res) => {
  let currentPharmacies = pharmacies.slice(15, 30);
  res.render('proof-of-concept/profiles/profiles-page2', { currentPharmacies, pharmacies });
});

router.get('/profiles/profiles-page3', (req, res) => {
  let currentPharmacies = pharmacies.slice(31, 45);
  res.render('proof-of-concept/profiles/profiles-page3', { currentPharmacies, pharmacies });
});

router.get('/profiles/editor/manage-profile', function(req, res) {
  let facilitiesLastUpdatedDate = '12 December 2019';
  if (localStorage.getItem('facilitiesLastUpdatedDate')) {
    facilitiesLastUpdatedDate = localStorage.getItem(
      'facilitiesLastUpdatedDate'
    );
  }
  res.render('proof-of-concept/profiles/editor/manage-profile', {
    facilitiesLastUpdatedDate,
  });
});

router.post('/profiles/search', (req, res) => {
  let searchTerm = req.body.search;
  let currentPharmacies = findByPostCode(searchTerm)
  res.render('proof-of-concept/profiles/index', { currentPharmacies, searchTerm })
});

function findByPostCode(searchTerm) {
  const searchResults = pharmacies.filter(pharm =>
    pharm.Postcode.toLowerCase().replace(/ /g,'').includes(searchTerm.toLowerCase().replace(/ /g,''))
  );
  return searchResults;
}

function findLeeds(searchTerm) {
  const searchResults = pharmacies.filter(pharm => pharm.city.toLowerCase() === searchTerm.toLowerCase());
  return searchResults;
}

router.get('/profiles/profile-list-leeds', (req, res) => {
  const currentPharmacies = findLeeds('Leeds');
  const searchTerm = "Leeds";
  res.render('proof-of-concept/profiles/profile-list-leeds', { currentPharmacies, searchTerm })
})

router.post('/profiles/editor/facilities/facilities-edit', function(req, res) {
  localStorage.setItem(
    'facilitiesLastUpdatedDate',
    moment().format('DD MMMM YYYY')
  );
  res.redirect('/proof-of-concept/profiles/editor/manage-profile');
});

module.exports = {
  router: router,
  localStorage: localStorage
};