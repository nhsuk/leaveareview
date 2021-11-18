const LocalStorage = require('node-localstorage').LocalStorage;

// External dependencies
const express = require('express');
const router = express.Router();
const moment = require('moment');
const app = require('../../../../app');

const reviews = require('../../../data/reviews');
const pharmacies = require('../../../data/pharmacies');

// Create local storage for opening times
<<<<<<< HEAD
const localStorage = new LocalStorage('./scratch');
=======
const localStorage = new LocalStorage('./../../scratch');
>>>>>>> Refactoring editor

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
<<<<<<< HEAD
  return review;
})

router.post('/editor/profiles/search-pharmacy', (req, res) => {
  let searchTerm = req.body.search;
  let currentPharmacies = findByPostCode(searchTerm);
  if (searchTerm.toLowerCase() === 'leeds') {
    res.redirect('/profiles/multiple-places');
  }
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

  // Setting values to booleans again due to localStorage using strings
  contactDetailsConfirmed = JSON.parse(contactDetailsConfirmed);
  facilitiesConfirmed = JSON.parse(facilitiesConfirmed);
  servicesConfirmed = JSON.parse(servicesConfirmed);

  res.render('profile-manager/pharmacies/editor/manage-profile', {
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

//*********************** */
// Branching - Org name
//*********************** */
=======
  return review
})

// Branching - Org Response Tool
router.post('/process-response', function (req, res) {
  let response = req.body.yourresponse;

  if (response == '') {
    res.redirect('/org-response/response-error');
  } else {
    res.redirect('/org-response/response-confirm');
  }
});

// Branching - Profile Editor
>>>>>>> Refactoring editor
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

<<<<<<< HEAD
//*********************** */
// Branching - Contact details 
//*********************** */
router.get('/editor/contact-details/contact-details-phone-edit', function (req, res) {
  let primaryTelephone = localStorage.getItem('primaryTelephone')
  res.render('profile-manager/pharmacies/editor/contact-details/contact-details-phone-edit', { primaryTelephone });
});

router.post('/editor/contact-details/contact-details-phone-edit', function (req, res) {
  localStorage.setItem('primaryTelephone', req.body.telephone);
  res.redirect('/profile-manager/pharmacies/editor/contact-details/contact-details-online-edit');
});

router.post('/editor/contact-details/contact-details-online-edit', function (req, res) {
  let email = req.body.email;
  if (!email) {
    res.redirect('/profile-manager/pharmacies/editor/contact-details/contact-details-online-edit?error=true');
  } else {
    res.redirect('/profile-manager/pharmacies/editor/contact-details/contact-details-check');
  }
});

router.get('/editor/contact-details/contact-details-check', function (req, res) {
  const showEditAll = req.query.hasOwnProperty('check')
  res.render('profile-manager/pharmacies/editor/contact-details/contact-details-check', { showEditAll })
})

router.post('/editor/contact-details/contact-details-check', function (req, res) {
=======
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
>>>>>>> Refactoring editor
  localStorage.setItem(
    'contactDetailsUpdatedDate',
    moment().format('DD MMMM YYYY')
  );
  recentChangeMade = true;
  localStorage.setItem('contactDetailsConfirmed', true);
<<<<<<< HEAD
  res.redirect('/profile-manager/pharmacies/editor/manage-profile');
=======
  res.redirect('/editor/manage-profile');

>>>>>>> Refactoring editor
}); 

//*********************** */
// Branching - Facilities
//*********************** */
<<<<<<< HEAD
router.get('/editor/facilities/facilities-edit', function (req, res) {
  recentChangeMade = false;
  res.render('profile-manager/pharmacies/editor/facilities/facilities-edit');
});

router.post('/editor/facilities/facilities-edit', function (req, res) {
  res.redirect('/profile-manager/pharmacies/editor/facilities/facilities-check');
});

router.post('/editor/facilities/facilities-check', function (req, res) {
=======

router.get('/editor/facilities/facilities-edit', function (req, res) {
  recentChangeMade = false;
  res.render('editor/facilities/facilities-edit');
});

router.post('/facilities-edit', function (req, res) {
  res.redirect('/editor/facilities/facilities-check');
});

router.post('/facilities-check', function (req, res) {
>>>>>>> Refactoring editor
  localStorage.setItem(
    'facilitiesUpdatedDate',
    moment().format('DD MMMM YYYY')
  );
  recentChangeMade = true;
  facilitiesConfirmed = true;
<<<<<<< HEAD
  res.redirect('/profile-manager/pharmacies/editor/manage-profile');
});

=======
  res.redirect('/editor/manage-profile');
});


>>>>>>> Refactoring editor
//*********************** */
// Branching - Services
//*********************** */
router.get('/editor/services/services-edit', function (req, res) {
  recentChangeMade = false;
<<<<<<< HEAD
  res.render('profile-manager/pharmacies/editor/services/services-edit');
});

router.post('/editor/services/services-edit', function (req, res) {
  res.redirect('/profile-manager/pharmacies/editor/services/services-check');
});

router.post('/editor/services/services-check', function (req, res) {
=======
  res.render('editor/services/services-edit');
});

router.post('/services-edit', function (req, res) {
  res.redirect('/editor/services/services-check');
});

router.post('/services-check', function (req, res) {
>>>>>>> Refactoring editor
  localStorage.setItem(
    'servicesUpdatedDate',
    moment().format('DD MMMM YYYY')
  );
  recentChangeMade = true;
  servicesConfirmed = true;
<<<<<<< HEAD
  res.redirect('/profile-manager/pharmacies/editor/manage-profile');
});

//*********************** */
// Branching - Services 
//*********************** */
=======
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
>>>>>>> Refactoring editor
router.post('/services-edit', function (req, res) {
  res.redirect('/editor/services/services-check');
});

router.get('/editor/services/index', function (req, res) {
  recentChangeMade = false;
  res.render('editor/services/index');
});

<<<<<<< HEAD
router.get('/editor/profiles', (req, res) => {
=======
// Branching - Facilities
router.post('/facilities', function (req, res) {
  res.redirect('/editor/manage-profile');
});

router.get('/profiles', (req, res) => {
>>>>>>> Refactoring editor
  recentChangeMade = false;
  // contactDetailsConfirmed = false;
  // facilitiesConfirmed = false;
  // servicesConfirmed = false;
  currentPharmacies = pharmacies.slice(0, 15);
<<<<<<< HEAD
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
=======
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

router.post('/search-pharmacy', (req, res) => {
>>>>>>> Refactoring editor
  let searchTerm = req.body.search;
  let currentPharmacies = findByPostCode(searchTerm);
  if (searchTerm.toLowerCase() === 'leeds') {
    res.redirect('/profiles/multiple-places');
  }
  if (currentPharmacies.length === 0) {
<<<<<<< HEAD
    res.redirect('/profile-manager/pharmacies/profiles-comments/no-results');
  } else {
    res.render('profile-manager/pharmacies/profiles-comments/index', { currentPharmacies, searchTerm });
=======
    res.redirect('/editor/no-results');
  } else {
    res.render('profiles/index', { currentPharmacies, searchTerm });
>>>>>>> Refactoring editor
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
<<<<<<< HEAD
  res.render('profile-manager/pharmacies/profiles-comments/index', { currentPharmacies, pharmacies });
=======
  res.render('profiles-comments/index', { currentPharmacies, pharmacies });
>>>>>>> Refactoring editor
});

router.get('/profiles-comments/profiles-page2', (req, res) => {
  let currentPharmacies = pharmacies.slice(15, 30);
<<<<<<< HEAD
  res.render('profile-manager/pharmacies/profiles-comments/profiles-page2', {
=======
  res.render('profiles-comments/profiles-page2', {
>>>>>>> Refactoring editor
    currentPharmacies,
    pharmacies,
  });
});

<<<<<<< HEAD
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
=======
router.post('/search-pharmacy-reviews', (req, res) => {
  let searchTerm = req.body.search;
  if (searchTerm.toLowerCase() === 'leeds') {
    res.redirect('/profiles-comments/multiple-places');
  } else {
    res.redirect('profiles-comments/no-results');
>>>>>>> Refactoring editor
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

<<<<<<< HEAD
=======
// router.post('/search-pharmacy-with-comments', (req, res) => {
//   let searchTerm = req.body.search;
//   const currentPharmacies = findByODS(searchTerm);
//   res.render('profiles-comments/index', {
//     currentPharmacies,
//     pharmacies,
//     searchTerm
//   });
// });

>>>>>>> Refactoring editor
function findByODS(searchTerm) {
  const searchResults = pharmacies.filter((pharm) =>
    pharm.ODSCode.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return searchResults;
}

<<<<<<< HEAD
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
=======
/* Sort and and full search no longer required for mvp */

function findService(query) {
  const servicesFound = pharmacies.filter((pharm) =>
    Object.values(pharm).find((val) =>
      val.toLowerCase().includes(query.toLowerCase())
    )
  );
  return servicesFound;
}

router.get('/profiles/sort-name', (req, res) => {
  let currentPharmacies = pharmacies.slice(0, 15);
  currentPharmacies = currentPharmacies.sort((a, b) =>
    a.Name.localeCompare(b.Name)
  );
  res.render('profiles/sort-name', { currentPharmacies, pharmacies });
});

router.get('/profiles/sort-city', (req, res) => {
  let currentPharmacies = pharmacies.slice(0, 15);
  currentPharmacies = currentPharmacies.sort((a, b) =>
    a.Town.localeCompare(b.Town)
  );
  res.render('profiles/sort-name', { currentPharmacies, pharmacies });
});

router.get('/org-response', (req, res) => {
  res.render('org-response/index', { reviews });
});

router.post('/org-response/search-review', (req, res) => {
  if (req.body["sort-by"] === "starRating") {
    res.redirect('reviews-sort-rating')
  }
  res.redirect('reviews-one-star')
})

router.get('/org-response/reviews-one-star', (req, res) => {
  oneStarReviews = reviews.filter(rating => rating.starRating === 1);
  // oneStarReviews = oneStarReviews.slice(0, 2)
  res.render('org-response/reviews-one-star', { oneStarReviews });
});

router.get('/org-response/reviews-sort-rating', (req, res) => {
  sortedReviews = reviews.sort((a, b) => a.starRating > b.starRating ? 1 : -1);
  res.render('org-response/reviews-sort-rating', { sortedReviews });
})

router.get('/profiles-comments/all-comments', (req, res) => {
  res.render('profiles-comments/all-comments', { reviews });
});

router.post('/profiles-comments/all-comments', (req, res) => {
  if (req.body["sort-by"] === "starRating") {
    res.redirect('reviews-sort-rating')
  }
  res.redirect('reviews-one-star')
>>>>>>> Refactoring editor
})

module.exports = {
  router: router,
  localStorage: localStorage,
  recentChangeMade
};
