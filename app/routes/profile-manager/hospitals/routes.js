const LocalStorage = require('node-localstorage').LocalStorage;

// External dependencies
const express = require('express');
const router = express.Router();
const moment = require('moment');
const app = require('../../../../app');

const reviews = require('../../../data/reviews');
const hospitals = require('../../../data/hospitals');

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

//*********************** */
// Branching - Services
//*********************** */
router.get('/editor/services/services-edit', function (req, res) {
  recentChangeMade = false;
  res.render('profile-manager/hospitals/editor/services/services-edit');
});

router.post('/editor/services/services-edit', function (req, res) {
  res.redirect('services-check');
});

router.post('/editor/services/services-check', function (req, res) {
  localStorage.setItem(
    'servicesUpdatedDate',
    moment().format('DD MMMM YYYY')
  );
  recentChangeMade = true;
  servicesConfirmed = true;
  res.redirect('../../editor/manage-profile');
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

/* Profiles with comments */
router.get('/profiles-comments', (req, res) => {
  let currentDentists = dentists.slice(0, 15);
  res.render('profile-manager/hospitals/profiles-comments/index', { currentDentists, dentists });
});

router.get('/profiles-comments/profiles-page2', (req, res) => {
  let currentDentists = dentists.slice(15, 30);
  res.render('profile-manager/hospitals/profiles-comments/profiles-page2', {
    currentDentists,
    dentists,
  });
});

router.get('/profiles-comments/all-comments', (req, res) => {
  res.render('profile-manager/hospitals/profiles-comments/all-comments', { reviews });
});

router.post('/profiles-comments/all-comments', (req, res) => {
  if (req.body["sort-by"] === "starRating") {
    res.redirect('reviews-sort-rating')
  }
  res.redirect('reviews-one-star')
})

function findByODS(searchTerm) {
  const searchResults = dentists.filter((curr) =>
    curr.ODSCode.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return searchResults;
}

router.post('/org-response/response', function (req, res) {
  let response = req.body.yourresponse;
  if (response == '') {
    res.redirect('response-error');
  } else {
    res.redirect('response-confirm');
  }
});

router.post('/profiles-comments/all-comments/search-review', (req, res) => {
  if (req.body["sort-by"] === "starRating") {
    res.redirect('/profile-manager/hospitals/profiles-comments/reviews-sort-rating')
  }
  res.redirect('/profile-manager/hospitals/profiles-comments/reviews-one-star')
})

router.get('/profiles-comments/reviews-one-star', (req, res) => {
  oneStarReviews = reviews.filter(rating => rating.starRating === 1);
  // oneStarReviews = oneStarReviews.slice(0, 2)
  res.render('profile-manager/hospitals/profiles-comments/reviews-one-star', { oneStarReviews });
});

router.get('/profiles-comments/reviews-sort-rating', (req, res) => {
  let sortedReviews = reviews; 
  sortedReviews = sortedReviews.sort((a, b) => a.starRating > b.starRating ? 1 : -1);
  res.render('profile-manager/hospitals/profiles-comments/reviews-sort-rating', { sortedReviews });
})

/***********************
 * ADD PROFILES
 **********************/
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
  localStorage: localStorage,
  recentChangeMade
};
