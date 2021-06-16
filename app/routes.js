const LocalStorage = require('node-localstorage').LocalStorage;

// External dependencies
const express = require('express');
const router = express.Router();
const pharmacies = require('./data/pharmacies');
const moment = require('moment');
const app = require('../app');

// Create local storage for opening times
const localStorage = new LocalStorage('./scratch');

let recentChangeMade = false;

moment.locale('en-GB');
// Branching - Leave a review

router.post('/rating-review', function (req, res) {
  let month = req.body.month;
  let year = req.body.year;

  if (year < 2017) {
    res.redirect('/dentists/leave-review/visitdate?error=true');
  } else if (!month) {
    res.redirect('/dentists/leave-review/visitdate?error=true');
  } else {
    res.redirect('/dentists/leave-review/rating-question-1');
  }
});

router.post('/q1', function (req, res) {
  let familyfriends = req.body.familyfriends;

  if (!familyfriends) {
    res.redirect('/dentists/leave-review/rating-question-1?error=true');
  } else {
    res.redirect('/dentists/leave-review/rating-question-2');
  }
});

router.post('/q2', function (req, res) {
  let title = req.body.title;
  let details = req.body.details;

  if (!title) {
    res.redirect('/dentists/leave-review/rating-question-2?error=true');
  } else if (!details) {
    res.redirect('/dentists/leave-review/rating-question-2?error=true');
  } else {
    res.redirect('/dentists/leave-review/rating-question-3');
  }
});

router.post('/q3', function (req, res) {
  let email = req.body.email;
  let confirmemail = req.body.confirmemail;
  let displayname = req.body.displayname;

  if (!email) {
    res.redirect('/dentists/leave-review/rating-question-3?error=true');
  } else if (!confirmemail) {
    res.redirect('/dentists/leave-review/rating-question-3?error=true');
  } else if (!displayname) {
    res.redirect('/dentists/leave-review/rating-question-3?error=true');
  } else {
    res.redirect('/dentists/leave-review/rating-question-4');
  }
});

router.post('/q4', function (req, res) {
  let furtherratings = req.body.furtherratings;

  if (!furtherratings) {
    res.redirect('/dentists/leave-review/rating-question-4?error=true');
  } else if (furtherratings == 'yes') {
    res.redirect('/dentists/leave-review/rating-question-5');
  } else {
    res.redirect('/dentists/leave-review/rating-question-10');
  }
});

router.post('/q5', function (req, res) {
  let appointmentwaitingtime = req.body.appointmentwaitingtime;

  if (!appointmentwaitingtime) {
    res.redirect('/dentists/leave-review/rating-question-5?error=true');
  } else {
    res.redirect('/dentists/leave-review/rating-question-6');
  }
});

router.post('/q6', function (req, res) {
  let dignityrespect = req.body.dignityrespect;

  if (!dignityrespect) {
    res.redirect('/dentists/leave-review/rating-question-6?error=true');
  } else {
    res.redirect('/dentists/leave-review/rating-question-7');
  }
});

router.post('/q7', function (req, res) {
  let treatmentdecisions = req.body.treatmentdecisions;

  if (!treatmentdecisions) {
    res.redirect('/dentists/leave-review/rating-question-7?error=true');
  } else {
    res.redirect('/dentists/leave-review/rating-question-8');
  }
});

router.post('/q8', function (req, res) {
  let treatmentcostsinfo = req.body.treatmentcostsinfo;

  if (!treatmentcostsinfo) {
    res.redirect('/dentists/leave-review/rating-question-8?error=true');
  } else {
    res.redirect('/dentists/leave-review/rating-question-9');
  }
});

router.post('/q9', function (req, res) {
  let treatmentoutcome = req.body.treatmentoutcome;

  if (!treatmentoutcome) {
    res.redirect('/dentists/leave-review/rating-question-9?error=true');
  } else {
    res.redirect('/dentists/leave-review/rating-question-10');
  }
});

// Branching - Report a comment

router.post('/rcq1', function (req, res) {
  let reportreason = req.body.reportreason;

  if (!reportreason) {
    res.redirect('/dentists/report-comment/rcq1?error=true');
  } else if (reportreason == 'Offensive content') {
    res.redirect('/dentists/report-comment/rcq2');
  } else if (reportreason == 'Innacurate content') {
    res.redirect('/dentists/report-comment/rcq2');
  } else if (reportreason == 'Incorrect organisation') {
    res.redirect('/dentists/report-comment/rcq2');
  } else if (reportreason == 'Other') {
    res.redirect('/dentists/report-comment/rcq2');
  } else {
    res.redirect('/dentists/report-comment/rcq2');
  }
});

router.post('/rcq2', function (req, res) {
  let moredetail = req.body.moredetail;

  if (!moredetail) {
    res.redirect('/dentists/report-comment/rcq2?error=true');
  } else {
    res.redirect('/dentists/report-comment/rcq3');
  }
});

router.post('/rcq3', function (req, res) {
  let emailaddress = req.body.emailaddress;
  let confirmemailaddress = req.body.confirmemailaddress;

  if (!emailaddress) {
    res.redirect('/dentists/report-comment/rcq3?error=true');
  }
  if (!confirmemailaddress) {
    res.redirect('/dentists/report-comment/rcq3?error=true');
  } else {
    res.redirect('/dentists/report-comment/rcca');
  }
});

router.post('/confirmation', function (req, res) {
  let moredetail = req.body.moredetail;

  if (!moredetail) {
    res.redirect('/dentists/report-comment/rcq2?error=true');
  } else {
    res.redirect('/dentists/report-comment/rcq3');
  }
});

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

router.post('/address', function (req, res) {
  let address1 = req.body.address1;

  if (!address1) {
    res.redirect('/editor/edit-address?error=true');
  } else {
    res.redirect('/editor/manage-profile');
  }
});

// Branching - Contact Details

router.get('/editor/contact-details-start', (req, res) => {
  recentChangeMade = false;
  res.render('editor/contact-details-start');
});

let primaryTelephone = 4111111
router.get('/editor/contact-details-phone-edit', function (req, res) {
  res.render('editor/contact-details-phone-edit', { primaryTelephone });
});

router.post('/editor/contact-details-phone-edit', function (req, res) {
  primaryTelephone = req.body.telephone;
  res.redirect('/editor/contact-details-online-edit');
});

router.post('/contact-details-2', function (req, res) {
  let email = req.body.email;
  if (!email) {
    res.redirect('/editor/contact-details-online-edit?error=true');
  } else {
    // res.redirect('/editor/contact-details-consultation-edit');
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

router.post('/contact-details-check', function (req, res) {
  localStorage.setItem(
    'contactDetailsUpdatedDate',
    moment().format('DD MMMM YYYY')
  );
  recentChangeMade = true;
  res.redirect('/editor/manage-profile');
});

router.get('/editor/facilities/facilities-edit', function (req, res) {
  recentChangeMade = false;
  res.render('editor/facilities/facilities-edit');
});

router.post('/facilities-edit', function (req, res) {
  res.redirect('/editor/facilities/facilities-check');
});

router.post('/facilities-check', function (req, res) {
  localStorage.setItem(
    'facilitiesLastUpdatedDate',
    moment().format('DD MMMM YYYY')
  );
  recentChangeMade = true;
  res.redirect('/editor/manage-profile');
});

router.post('/private-services', function (req, res) {
  localStorage.setItem(
    'servicesLastUpdatedDate',
    moment().format('DD MMMM YYYY')
  );
  recentChangeMade = true;
  res.redirect('/editor/manage-profile');
});

router.get('/editor/manage-profile', function (req, res) {
  let contactDetailsLastUpdatedDate = '12 December 2019';
  let openingTimesLastUpdatedDate = '12 December 2019';
  let facilitiesLastUpdatedDate = '12 December 2019';
  let servicesLastUpdatedDate = '12 December 2019';
  let newpatientLastUpdatedDate = '12 December 2019';
  let availabilityLastUpdatedDate = '12 December 2019';

  if (localStorage.getItem('contactDetailsUpdatedDate')) {
    contactDetailsLastUpdatedDate = localStorage.getItem(
      'contactDetailsUpdatedDate'
    );
  }
  if (localStorage.getItem('lastUpdatedOn')) {
    openingTimesLastUpdatedDate = localStorage.getItem('lastUpdatedOn');
  }
  if (localStorage.getItem('facilitiesLastUpdatedDate')) {
    facilitiesLastUpdatedDate = localStorage.getItem(
      'facilitiesLastUpdatedDate'
    );
  }
  if (localStorage.getItem('servicesLastUpdatedDate')) {
    servicesLastUpdatedDate = localStorage.getItem('servicesLastUpdatedDate');
  }
  if (localStorage.getItem('availabilityLastUpdatedDate')) {
    availabilityLastUpdatedDate = localStorage.getItem(
      'availabilityLastUpdatedDate'
    );
  }
  if (localStorage.getItem('newpatientLastUpdatedDate')) {
    newpatientLastUpdatedDate = localStorage.getItem(
      'newpatientLastUpdatedDate'
    );
  }
  res.render('editor/manage-profile', {
    contactDetailsLastUpdatedDate,
    openingTimesLastUpdatedDate,
    facilitiesLastUpdatedDate,
    servicesLastUpdatedDate,
    availabilityLastUpdatedDate,
    newpatientLastUpdatedDate,
    recentChangeMade,
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

router.post('/direct', function (req, res) {
  let patienttype1 = req.body.patienttype1;
  let patienttype2 = req.body.patienttype2;
  let patienttype3 = req.body.patienttype3;

  if (!patienttype1) {
    res.redirect('/editor/availability/availability-2?error=true');
  } else {
    res.redirect('/editor/availability/availability-confirm');
  }
});

router.post('/newpatients', function (req, res) {
  let newpatients = req.body.newpatients;
  localStorage.setItem(
    'newpatientLastUpdatedDate',
    moment().format('DD MMMM YYYY')
  );
  if (!newpatients) {
    res.redirect('/editor/new-patients/index?error=true');
  } else if (newpatients == 'Yes') {
    res.redirect('/editor/manage-profile?newpatientstatus=Yes');
  } else {
    res.redirect('/editor/manage-profile?newpatientstatus=No');
  }
});

// Branching - Ask a doctor a question

router.post('/aaq2', function (req, res) {
  let practicename = req.body.practicename;

  if (!practicename) {
    res.redirect('/gps/askaquestion/aaq1?error=true');
  } else {
    res.redirect('/gps/askaquestion/aaq2');
  }
});

router.post('/aaq3', function (req, res) {
  let name = req.body.name;
  let day = req.body.day;
  let month = req.body.month;
  let year = req.body.year;
  let phone = req.body.phone;
  let emailaddress = req.body.emailaddress;
  let confirmemailaddress = req.body.confirmemailaddress;

  if (!name) {
    res.redirect('/gps/askaquestion/aaq2?error=true');
  }
  if (!day) {
    res.redirect('/gps/askaquestion/aaq2?error=true');
  }
  if (!month) {
    res.redirect('/gps/askaquestion/aaq2?error=true');
  }
  if (!year) {
    res.redirect('/gps/askaquestion/aaq2?error=true');
  }
  if (!year) {
    res.redirect('/gps/askaquestion/aaq2?error=true');
  }
  if (!emailaddress) {
    res.redirect('/gps/askaquestion/aaq2?error=true');
  }
  if (!confirmemailaddress) {
    res.redirect('/gps/askaquestion/aaq2?error=true');
  } else {
    res.redirect('/gps/askaquestion/aaq3');
  }
});

// Branching - Services
router.post('/nhs-services', function (req, res) {
  res.redirect('/editor/services/private-services');
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
  let currentPharmacies = pharmacies.slice(0, 15);
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
  let searchTerm = req.body.search;
  let currentPharmacies = findByPostCode(searchTerm);
  if (searchTerm.toLowerCase() === 'leeds') {
    res.redirect('/profiles/multiple-places');
  }
  if (currentPharmacies.length === 0) {
    res.redirect('/editor/no-results');
  } else {
    res.render('profiles/index', { currentPharmacies, searchTerm });
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
  res.render('profiles-comments/index', { currentPharmacies, pharmacies });
});

router.get('/profiles-comments/profiles-page2', (req, res) => {
  let currentPharmacies = pharmacies.slice(15, 30);
  res.render('profiles-comments/profiles-page2', {
    currentPharmacies,
    pharmacies,
  });
});

router.post('/search-pharmacy-reviews', (req, res) => {
  let searchTerm = req.body.search;
  if (searchTerm.toLowerCase() === 'leeds') {
    res.redirect('/profiles-comments/multiple-places');
  } else {
    res.redirect('profiles-comments/no-results');
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

// router.post('/search-pharmacy-with-comments', (req, res) => {
//   let searchTerm = req.body.search;
//   const currentPharmacies = findByODS(searchTerm);
//   res.render('profiles-comments/index', {
//     currentPharmacies,
//     pharmacies,
//     searchTerm
//   });
// });

function findByODS(searchTerm) {
  const searchResults = pharmacies.filter((pharm) =>
    pharm.ODSCode.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return searchResults;
}

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

module.exports = {
  router: router,
  localStorage: localStorage,
  recentChangeMade
};
