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
  let currentPharmacies = pharmacies;
  res.render('proof-of-concept/profiles/index', { currentPharmacies, pharmacies });
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
  if (searchTerm.toLowerCase() === "leeds") {
    res.redirect("/proof-of-concept/profiles/multiple-places");
  } else {
    res.render("/proof-of-concept/profiles/no-results", { searchTerm });
  }
});

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