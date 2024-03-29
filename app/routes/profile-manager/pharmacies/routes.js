const LocalStorage = require('node-localstorage').LocalStorage;

// External dependencies
const express = require('express');
const router = express.Router();
const moment = require('moment');
const app = require('../../../../app');

const reviews = require('../../../data/reviews');
const pharmacies = require('../../../data/pharmacies');

// Create local storage for opening times
const localStorage = new LocalStorage('./scratch');

let recentChangeMade = false;

moment.locale('en-GB');

pharmacies.sort((a, b) => {
  return b.comments - a.comments
});

reviews.forEach((review) => {
  review.datePosted = moment(review.datePosted, 'DD/MM/YYYY').format('DD MMM YYYY')
  review.dateVisited = moment(review.dateVisited, 'MM/YYYY').format('MMM YYYY')
  return review;
})

router.post('/editor/profiles/search-pharmacy', (req, res) => {
  let searchTerm = req.body.search;
  let currentPharmacies = findByPostCode(searchTerm);
  if (currentPharmacies.length === 0) {
    res.redirect('/profile-manager/pharmacies/editor/profiles/no-results');
  } else {
    res.render('profile-manager/pharmacies/editor/profiles/index', { currentPharmacies, searchTerm });
  }
});

router.get('/editor/manage-profile', function (req, res) {
  let contactDetailsLastUpdatedDate = localStorage.getItem('contactDetailsUpdatedDate')
  let openingTimesLastUpdatedDate = localStorage.getItem('openingTimesUpdatedDate')
  let facilitiesLastUpdatedDate = localStorage.getItem('facilitiesUpdatedDate')
  let servicesLastUpdatedDate = localStorage.getItem('servicesUpdatedDate')
  let contactDetailsConfirmed = localStorage.getItem('contactDetailsConfirmed');
  let facilitiesConfirmed = localStorage.getItem('facilitiesConfirmed');
  let servicesConfirmed = localStorage.getItem('servicesConfirmed');
  let addressChangePending = localStorage.getItem('addressChangePending');

  // Setting values to booleans again due to localStorage using strings
  contactDetailsConfirmed = JSON.parse(contactDetailsConfirmed);
  facilitiesConfirmed = JSON.parse(facilitiesConfirmed);
  servicesConfirmed = JSON.parse(servicesConfirmed);
  addressChangePending = JSON.parse(addressChangePending);

  res.render('profile-manager/pharmacies/editor/manage-profile', {
    contactDetailsLastUpdatedDate,
    openingTimesLastUpdatedDate,
    facilitiesLastUpdatedDate,
    servicesLastUpdatedDate,
    recentChangeMade,
    contactDetailsConfirmed,
    facilitiesConfirmed,
    servicesConfirmed,
    addressChangePending,
  });
});

//*********************** */
// Branching - Org name
//*********************** */

router.post('/editor/change-name/name-edit', function (req, res) {
  res.redirect('confirm-name-change');
})

router.post('/editor/change-name/confirm-name-change', function (req, res) {
  recentChangeMade = true;
  res.redirect('../../editor/manage-profile');
});

//*********************** */
// Branching - Contact details 
//*********************** */
router.get('/editor/contact-details/contact-details-phone-edit', function (req, res) {
  let primaryTelephone = localStorage.getItem('primaryTelephone')
  res.render('profile-manager/pharmacies/editor/contact-details/contact-details-phone-edit', { primaryTelephone });
});

router.post('/editor/contact-details/contact-details-phone-edit', function (req, res) {
  localStorage.setItem('primaryTelephone', req.body.telephone);
  res.redirect('contact-details-online-edit');
});

router.post('/editor/contact-details/contact-details-online-edit', function (req, res) {
  res.redirect('contact-details-check');
});

router.get('/editor/contact-details/contact-details-check', function (req, res) {
  const showEditAll = req.query.hasOwnProperty('check')
  res.render('profile-manager/pharmacies/editor/contact-details/contact-details-check', { showEditAll })
})

router.post('/editor/contact-details/contact-details-check', function (req, res) {
  localStorage.setItem(
    'contactDetailsUpdatedDate',
    moment().format('DD MMMM YYYY')
  );
  recentChangeMade = true;
  localStorage.setItem('contactDetailsConfirmed', true);
  res.redirect('../../editor/manage-profile');
}); 

//*********************** */
// Branching - Address 
//*********************** */
router.post('/editor/address/address-change', function (req, res) {
  res.redirect('address-check');
})

router.post('/editor/address/address-check', function (req, res) {
  localStorage.setItem('addressChangePending', true);
  res.redirect('../../editor/manage-profile');
})

router.post('/editor/address/address-pending', function (req, res) {
  localStorage.setItem('addressChangePending', false);
  recentChangeMade = true;
  res.redirect('../../editor/manage-profile');
})

//*********************** */
// Branching - Facilities
//*********************** */
router.get('/editor/facilities/facilities-edit', function (req, res) {
  recentChangeMade = false;
  res.render('profile-manager/pharmacies/editor/facilities/facilities-edit');
});

router.post('/editor/facilities/facilities-edit', function (req, res) {
  res.redirect('facilities-check');
});

router.post('/editor/facilities/facilities-check', function (req, res) {
  localStorage.setItem(
    'facilitiesUpdatedDate',
    moment().format('DD MMMM YYYY')
  );
  recentChangeMade = true;
  facilitiesConfirmed = true;
  res.redirect('../../editor/manage-profile');
});

//*********************** */
// Branching - Services
//*********************** */
let pharmacyServices = [];
router.get('/editor/services/services-edit', function (req, res) {
  recentChangeMade = false;
  res.render('profile-manager/pharmacies/editor/services/services-edit');
});

router.post('/editor/services/services-edit', function (req, res) {
  pharmacyServices = req.body.services
  res.redirect('services-check');
});

router.post('/editor/services/services-check', function (req, res) {
  localStorage.setItem(
    'servicesUpdatedDate',
    moment().format('DD MMMM YYYY')
  );
  recentChangeMade = true;
  localStorage.setItem('servicesConfirmed', true);
  res.redirect('attributes/more-detail-large-list');
});

router.get('/editor/services/dashboard', function (req, res) {
  let servicesLastUpdatedDate = localStorage.getItem('servicesUpdatedDate')
  let fluVaccineBookingLastUpdatedDate = localStorage.getItem('fluVaccineBookingLastUpdatedDate')
  let fluVaccineOnlineBookingConfirmed = localStorage.getItem('fluVaccineOnlineBookingConfirmed')
  let showAttributes = pharmacyServices.includes('Seasonal flu vaccination service (at risk groups)')
  fluVaccineOnlineBookingConfirmed = JSON.parse(fluVaccineOnlineBookingConfirmed);
  res.render('profile-manager/pharmacies/editor/services/dashboard', { 
    servicesLastUpdatedDate, 
    showAttributes,
    fluVaccineBookingLastUpdatedDate,
    fluVaccineOnlineBookingConfirmed
  });
});

router.get('/editor/services/attributes/more-detail', function (req, res) {
  let fluVaccineBookingLastUpdatedDate = localStorage.getItem('fluVaccineBookingLastUpdatedDate')
  let fluVaccineOnlineBookingConfirmed = localStorage.getItem('fluVaccineOnlineBookingConfirmed')
  fluVaccineOnlineBookingConfirmed = JSON.parse(fluVaccineOnlineBookingConfirmed);
  res.render('profile-manager/pharmacies/editor/services/attributes/more-detail', { 
    fluVaccineBookingLastUpdatedDate,
    recentChangeMade,
    fluVaccineOnlineBookingConfirmed
  });
});

router.post('/editor/services/attributes/flu-vaccine/confirm', function (req, res) {
  recentChangeMade = false;
  localStorage.setItem('fluVaccineOnlineBookingConfirmed', true);
  localStorage.setItem(
    'fluVaccineBookingLastUpdatedDate',
    moment().format('DD MMMM YYYY')
  );
  res.redirect('../../attributes/more-detail')
})

router.get('/editor/profiles', (req, res) => {
  recentChangeMade = false;
  currentPharmacies = pharmacies.slice(0, 15);
  res.render('profile-manager/pharmacies/editor/profiles/index', { currentPharmacies, pharmacies });
});

router.get('/editor/profiles/profiles-page2', (req, res) => {
  let currentPharmacies = pharmacies.slice(15, 30);
  res.render('profile-manager/pharmacies/editor/profiles/profiles-page2', { currentPharmacies, pharmacies });
});

router.get('/editor/profiles/profiles-page3', (req, res) => {
  let currentPharmacies = pharmacies.slice(31, 45);
  res.render('profile-manager/pharmacies/editor/profiles/profiles-page3', { currentPharmacies, pharmacies });
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

function findByODS(searchTerm) {
  const searchResults = pharmacies.filter((pharm) =>
    pharm.ODSCode.toLowerCase().includes(searchTerm.toLowerCase())
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
  res.render('profile-manager/pharmacies/add-profiles/add-profiles-confirm', { newProfiles });
});

router.get('/add-profiles/remove-profile', (req, res) => {
  const profiles = JSON.parse(localStorage.getItem('profilesToAdd'));
  res.render('profile-manager/pharmacies/add-profiles/remove-profile', { profiles });
});

router.post('/add-profiles/remove-profile', (req, res) => {
  const profilesToAdd = JSON.parse(localStorage.getItem('profilesToAdd'));
  const newProfiles = profilesToAdd.slice(1);
  localStorage.setItem('profilesToAdd', JSON.stringify(newProfiles));
  res.render('profile-manager/pharmacies/add-profiles/add-profiles-confirm', { newProfiles });
});

router.get('/add-profiles/add-profiles-complete', (req, res) => {
  localStorage.setItem('profilesToAdd', JSON.stringify([]));
  res.render('profile-manager/pharmacies/add-profiles/add-profiles-complete');
})

module.exports = {
  router: router,
  localStorage: localStorage,
  recentChangeMade
};
