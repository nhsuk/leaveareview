const LocalStorage = require('node-localstorage').LocalStorage;

// External dependencies
const express = require('express');
const router = express.Router();
const moment = require('moment');
const app = require('../../../../app');

const reviews = require('../../../data/reviews');
const hospitals = require('../../../data/hospitals/hospitals');
const hospitalDepartmentsList = require('../../../data/hospitals/departmentList');
const hospitalDepartments = require('../../../data/hospitals/departments');

// Create local storage for opening times
const localStorage = new LocalStorage('./scratch');

let recentChangeMade = false;
// let servicesConfirmed = false;
const alphabet = [];
for (var i = 65; i <= 90; i ++) {
  alphabet.push(String.fromCharCode(i));
}

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
  recentChangeMade = false;
  currentHospitals = hospitals.slice(0, 15);
  res.render('profile-manager/hospitals/editor/profiles/index', { currentHospitals, hospitals });
});

router.get('/editor/profiles/profiles-page2', (req, res) => {
  currentHospitals = hospitals.slice(15);
  res.render('profile-manager/hospitals/editor/profiles/profiles-page2', { currentHospitals, hospitals });
});

router.get('/editor/departments/royal/index', (req, res) => {
  currentDepartments = hospitalDepartments.slice(0, 15);
  res.render('profile-manager/hospitals/editor/departments/royal/index', { currentDepartments, hospitalDepartments })
})

router.get('/editor/departments/royal/add-departments', (req, res) => {
  res.render('profile-manager/hospitals/editor/departments/royal/add-departments', { hospitalDepartmentsList, alphabet })
})

router.get('/editor/departments/royal/departments/remove/remove-departments', (req, res) => {
  currentDepartments = hospitalDepartments.slice(0, 15);
  res.render('profile-manager/hospitals/editor/departments/royal/departments/remove/remove-departments', { currentDepartments, hospitalDepartments })
})

module.exports = {
  router: router,
  localStorage: localStorage,
  recentChangeMade
};
