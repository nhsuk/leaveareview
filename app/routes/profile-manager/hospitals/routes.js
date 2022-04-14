const LocalStorage = require('node-localstorage').LocalStorage;

// External dependencies
const express = require('express');
const router = express.Router();
const moment = require('moment');
const app = require('../../../../app');

const reviews = require('../../../data/reviews');
const hospitals = require('../../../data/hospitals');
const hospitalServices = require('../../../data/services');

// Create local storage for opening times
const localStorage = new LocalStorage('./scratch');

let recentChangeMade = false;
// let servicesConfirmed = false;

moment.locale('en-GB');

hospitals.sort((a, b) => {
  return b.comments - a.comments
});

reviews.forEach((review) => {
  review.datePosted = moment(review.datePosted, 'DD/MM/YYYY').format('DD MMM YYYY')
  review.dateVisited = moment(review.dateVisited, 'MM/YYYY').format('MMM YYYY')
  return review;
})

router.post('/editor/profiles/search-dentist', (req, res) => {
  let searchTerm = req.body.search;
  let currentDentists = findByPostCode(searchTerm);
  if (currentDentists.length === 0) {
    res.redirect('/profile-manager/hospitals/editor/profiles/no-results');
  } else {
    res.render('profile-manager/hospitals/editor/profiles/index', { currentDentists, searchTerm });
  }
});

router.get('/editor/manage-profile', function (req, res) {
  let openingTimesLastUpdatedDate = localStorage.getItem('openingTimesUpdatedDate')
  let servicesLastUpdatedDate = localStorage.getItem('servicesUpdatedDate')
  let servicesConfirmed = localStorage.getItem('servicesConfirmed');
  let addressChangePending = localStorage.getItem('addressChangePending');
  let patientTypeLastUpdatedDate = localStorage.getItem('patientTypeLastUpdatedDate')

  // Setting values to booleans again due to localStorage using strings
  servicesConfirmed = JSON.parse(servicesConfirmed);
  addressChangePending = JSON.parse(addressChangePending);

  res.render('profile-manager/hospitals/editor/manage-profile', {
    openingTimesLastUpdatedDate,
    servicesLastUpdatedDate,
    recentChangeMade,
    servicesConfirmed,
    addressChangePending,
    patientTypeLastUpdatedDate,
  });
});

router.get('/editor/profiles', (req, res) => {
  console.log('CHECK CHECK')
  recentChangeMade = false;
  currentHospitals = hospitals.slice(0, 15);
  res.render('profile-manager/hospitals/editor/profiles/index', { currentHospitals, hospitals });
});

router.get('/editor/profiles/profiles-page2', (req, res) => {
  currentHospitals = hospitals.slice(15);
  res.render('profile-manager/hospitals/editor/profiles/profiles-page2', { currentHospitals, hospitals });
});

router.get('/editor/departments/royal/index', (req, res) => {
  currentServices = hospitalServices.slice(0, 15);
  res.render('profile-manager/hospitals/editor/departments/royal/index', { currentServices, hospitalServices })
})

router.post('/profiles-comments/search-dentist', (req, res) => {
  let searchTerm = req.body.search;
  let currentDentists = findByPostCode(searchTerm);
  if (searchTerm.toLowerCase() === 'leeds') {
    res.redirect('/profiles/multiple-places');
  }
  if (currentDentists.length === 0) {
    res.redirect('/profile-manager/hospitals/profiles-comments/no-results');
  } else {
    res.render('profile-manager/hospitals/profiles-comments/index', { currentDentists, searchTerm });
  }
});

function findLeeds(searchTerm) {
  const searchResults = dentists.filter(
    (curr) => curr.city.toLowerCase() === searchTerm.toLowerCase()
  );
  return searchResults;
}

function findByPostCode(searchTerm) {
  const searchResults = dentists.filter((curr) =>
    curr.Postcode.toLowerCase()
      .replace(/ /g, '')
      .includes(searchTerm.toLowerCase().replace(/ /g, ''))
  );
  return searchResults;
}

router.get('/profiles/profile-list-leeds', (req, res) => {
  const currentDentists = findLeeds('Leeds');
  const searchTerm = 'Leeds';
  res.render('profiles/profile-list-leeds', { currentDentists, searchTerm });
});

module.exports = {
  router: router,
  localStorage: localStorage,
  recentChangeMade
};
