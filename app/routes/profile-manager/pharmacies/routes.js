const LocalStorage = require('node-localstorage').LocalStorage;

// External dependencies
const express = require('express');
const router = express.Router();
const moment = require('moment');
const app = require('../../../../app');

const reviews = require('../../../data/reviews');
const pharmacies = require('../../../data/pharmacies');

// Create local storage for opening times
const localStorage = new LocalStorage('./../../scratch');

let recentChangeMade = false;
// let contactDetailsConfirmed = false;
// let facilitiesConfirmed = false;
// let servicesConfirmed = false;

moment.locale('en-GB');

pharmacies.sort((a, b) => {
  return b.comments - a.comments
});

reviews.forEach((review) => {
  review.datePosted = moment(review.datePosted, 'DD/MM/YYYY').format('DD MMM YYYY')
  review.dateVisited = moment(review.dateVisited, 'MM/YYYY').format('MMM YYYY')
  return review;
})

// Branching - Org Response Tool

// Branching - Profile Editor
router.get('/editor/org-name-start', (req, res) => {
  recentChangeMade = false;
  res.render('editor/org-name-start');
});

router.post('/org-name', function (req, res) {
  let alias1 = req.body.alias1;

  if (!alias1) {
    res.redirect('/editor/org-name-edit?error=true');
  } else {
    res.redirect('/editor/org-name-choose-displayname');
  }
});

router.post('/display-name-2', function (req, res) {
  let displayname = req.body.displayname;

  if (!displayname) {
    res.redirect('/editor/org-name-choose-displayname?error=true');
  } else {
    res.redirect('/editor/org-name-confirm-displayname');
  }
});

router.post('/confirm-name', (req, res) => {
  recentChangeMade = true;
  res.redirect('/editor/manage-profile');
});

// Branching - Contact Details
router.get('/editor/contact-details-start', (req, res) => {
  recentChangeMade = false;
  res.render('editor/contact-details-start');
});

// let primaryTelephone = 4111111
router.get('/editor/contact-details-phone-edit', function (req, res) {
  let primaryTelephone = localStorage.getItem('primaryTelephone')
  res.render('editor/contact-details-phone-edit', { primaryTelephone });
});

router.post('/editor/contact-details-phone-edit', function (req, res) {
  localStorage.setItem('primaryTelephone', req.body.telephone);
  res.redirect('/editor/contact-details-online-edit');
});

router.post('/contact-details-2', function (req, res) {
  let email = req.body.email;
  if (!email) {
    res.redirect('/editor/contact-details-online-edit?error=true');
  } else {
    res.redirect('/editor/contact-details-check');
  }
});

router.post('/contact-details-3', function (req, res) {
  let offer = req.body.offer;

  if (!offer) {
    res.redirect('/editor/contact-details-consultation-edit?error=true');
  } else {
    res.redirect('/editor/contact-details-check');
  }
});

router.get('/editor/contact-details-check', function (req, res) {
  const showEditAll = req.query.hasOwnProperty('check')
  res.render('editor/contact-details-check', { showEditAll})
})

router.post('/contact-details-check', function (req, res) {
  localStorage.setItem(
    'contactDetailsUpdatedDate',
    moment().format('DD MMMM YYYY')
  );
  recentChangeMade = true;
  localStorage.setItem('contactDetailsConfirmed', true);
  res.redirect('/editor/manage-profile');

}); 

//*********************** */
// Branching - Facilities
//*********************** */

router.get('/editor/facilities/facilities-edit', function (req, res) {
  recentChangeMade = false;
  res.render('editor/facilities/facilities-edit');
});

router.post('/facilities-edit', function (req, res) {
  res.redirect('/editor/facilities/facilities-check');
});

router.post('/facilities-check', function (req, res) {
  localStorage.setItem(
    'facilitiesUpdatedDate',
    moment().format('DD MMMM YYYY')
  );
  recentChangeMade = true;
  facilitiesConfirmed = true;
  res.redirect('/editor/manage-profile');
});


//*********************** */
// Branching - Services
//*********************** */
router.get('/editor/services/services-edit', function (req, res) {
  recentChangeMade = false;
  res.render('editor/services/services-edit');
});

router.post('/services-edit', function (req, res) {
  res.redirect('/editor/services/services-check');
});

router.post('/services-check', function (req, res) {
  localStorage.setItem(
    'servicesUpdatedDate',
    moment().format('DD MMMM YYYY')
  );
  recentChangeMade = true;
  servicesConfirmed = true;
  res.redirect('/editor/manage-profile');
});

router.get('/editor/manage-profile', function (req, res) {
  let contactDetailsLastUpdatedDate = localStorage.getItem('contactDetailsUpdatedDate')
  let openingTimesLastUpdatedDate = localStorage.getItem('openingTimesUpdatedDate')
  let facilitiesLastUpdatedDate = localStorage.getItem('facilitiesUpdatedDate')
  let servicesLastUpdatedDate = localStorage.getItem('servicesUpdatedDate')
  let contactDetailsConfirmed = localStorage.getItem('contactDetailsConfirmed');
  let facilitiesConfirmed = localStorage.getItem('facilitiesConfirmed');
  let servicesConfirmed = localStorage.getItem('servicesConfirmed');

  // Setting values to booleans again due to localStorage using strings
  contactDetailsConfirmed = JSON.parse(contactDetailsConfirmed);
  facilitiesConfirmed = JSON.parse(facilitiesConfirmed);
  servicesConfirmed = JSON.parse(servicesConfirmed);

  res.render('editor/manage-profile', {
    contactDetailsLastUpdatedDate,
    openingTimesLastUpdatedDate,
    facilitiesLastUpdatedDate,
    servicesLastUpdatedDate,
    recentChangeMade,
    contactDetailsConfirmed,
    facilitiesConfirmed,
    servicesConfirmed,
  });
});

let whichPatients = [];
let newPatients;
router.post('/accepting', function (req, res) {
  newPatients = req.body.newPatients;
  whichPatients = req.body.whichPatients;
  localStorage.setItem(
    'availabilityLastUpdatedDate',
    moment().format('DD MMMM YYYY')
  );
  if (!newPatients) {
    res.redirect('/editor/availability/index?error=true');
  } else {
    res.redirect('/editor/manage-profile');
  }
});

router.get('/editor/availability/index', (req, res) => {
  if (newPatients === 'referral') whichPatients = [];
  let acceptingChildren = whichPatients.includes('children');
  let acceptingAdultsOver = whichPatients.includes('adults');
  let acceptingAdultsDental = whichPatients.includes('adultsDental');
  let notAccepting = whichPatients.includes('notAccepting');
  res.render('editor/availability/index', {
    acceptingChildren,
    acceptingAdultsOver,
    acceptingAdultsDental,
    notAccepting,
  });
});

// Branching - Services
router.post('/services-edit', function (req, res) {
  res.redirect('/editor/services/services-check');
});

router.get('/editor/services/index', function (req, res) {
  recentChangeMade = false;
  res.render('editor/services/index');
});

// Branching - Facilities
router.post('/facilities', function (req, res) {
  res.redirect('/editor/manage-profile');
});

router.get('/profiles', (req, res) => {
  recentChangeMade = false;
  // contactDetailsConfirmed = false;
  // facilitiesConfirmed = false;
  // servicesConfirmed = false;
  currentPharmacies = pharmacies.slice(0, 15);
  res.render('profiles/index', { currentPharmacies, pharmacies });
});

router.get('/profiles/profiles-page2', (req, res) => {
  let currentPharmacies = pharmacies.slice(15, 30);
  res.render('profiles/profiles-page2', { currentPharmacies, pharmacies });
});

router.get('/profiles/profiles-page3', (req, res) => {
  let currentPharmacies = pharmacies.slice(31, 45);
  res.render('profiles/profiles-page3', { currentPharmacies, pharmacies });
});

router.post('/profiles-comments/search-pharmacy', (req, res) => {
  let searchTerm = req.body.search;
  let currentPharmacies = findByPostCode(searchTerm);
  if (searchTerm.toLowerCase() === 'leeds') {
    res.redirect('/profiles/multiple-places');
  }
  if (currentPharmacies.length === 0) {
    res.redirect('/profile-manager/pharmacies/profiles-comments/no-results');
  } else {
    res.render('profile-manager/pharmacies/profiles-comments/index', { currentPharmacies, searchTerm });
  }
});

function findLeeds(searchTerm) {
  const searchResults = pharmacies.filter(
    (pharm) => pharm.city.toLowerCase() === searchTerm.toLowerCase()
  );
  return searchResults;
}

function findByPostCode(searchTerm) {
  const searchResults = pharmacies.filter((pharm) =>
    pharm.Postcode.toLowerCase()
      .replace(/ /g, '')
      .includes(searchTerm.toLowerCase().replace(/ /g, ''))
  );
  return searchResults;
}

router.get('/profiles/profile-list-leeds', (req, res) => {
  const currentPharmacies = findLeeds('Leeds');
  const searchTerm = 'Leeds';
  res.render('profiles/profile-list-leeds', { currentPharmacies, searchTerm });
});

/* Profiles with comments */
router.get('/profiles-comments', (req, res) => {
  let currentPharmacies = pharmacies.slice(0, 15);
  res.render('profile-manager/pharmacies/profiles-comments/index', { currentPharmacies, pharmacies });
});

router.get('/profiles-comments/profiles-page2', (req, res) => {
  let currentPharmacies = pharmacies.slice(15, 30);
  res.render('profile-manager/pharmacies/profiles-comments/profiles-page2', {
    currentPharmacies,
    pharmacies,
  });
});

router.get('/profiles-comments/all-comments', (req, res) => {
  res.render('profile-manager/pharmacies/profiles-comments/all-comments', { reviews });
});

router.post('/profiles-comments/all-comments', (req, res) => {
  if (req.body["sort-by"] === "starRating") {
    res.redirect('reviews-sort-rating')
  }
  res.redirect('reviews-one-star')
})

router.post('/search-pharmacy-reviews', (req, res) => {
  let searchTerm = req.body.search;
  if (searchTerm.toLowerCase() === 'leeds') {
    res.redirect('/profile-manager/pharmacies/profiles-comments/multiple-places');
  } else {
    res.redirect('/profile-manager/pharmacies/profiles-comments/no-results');
  }
});

router.get('/profiles-comments/profile-list-leeds', (req, res) => {
  const currentPharmacies = findLeeds('Leeds');
  const searchTerm = 'Leeds';
  res.render('profiles-comments/profile-list-leeds', {
    currentPharmacies,
    searchTerm,
  });
});

function findByODS(searchTerm) {
  const searchResults = pharmacies.filter((pharm) =>
    pharm.ODSCode.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return searchResults;
}

router.post('/org-response/response', function (req, res) {
  let response = req.body.yourresponse;

  if (response == '') {
    res.redirect('/profile-manager/pharmacies/org-response/response-error');
  } else {
    res.redirect('/profile-manager/pharmacies/org-response/response-confirm');
  }
});

router.post('/profiles-comments/all-comments/search-review', (req, res) => {
  if (req.body["sort-by"] === "starRating") {
    res.redirect('/profile-manager/pharmacies/profiles-comments/reviews-sort-rating')
  }
  res.redirect('/profile-manager/pharmacies/profiles-comments/reviews-one-star')
})

router.get('/profiles-comments/reviews-one-star', (req, res) => {
  oneStarReviews = reviews.filter(rating => rating.starRating === 1);
  // oneStarReviews = oneStarReviews.slice(0, 2)
  res.render('profile-manager/pharmacies/profiles-comments/reviews-one-star', { oneStarReviews });
});

router.get('/profiles-comments/reviews-sort-rating', (req, res) => {
  let sortedReviews = reviews; 
  sortedReviews = sortedReviews.sort((a, b) => a.starRating > b.starRating ? 1 : -1);
  res.render('profile-manager/pharmacies/profiles-comments/reviews-sort-rating', { sortedReviews });
})

module.exports = {
  router: router,
  localStorage: localStorage,
  recentChangeMade
};
