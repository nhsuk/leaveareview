const LocalStorage = require('node-localstorage').LocalStorage;

// External dependencies
const express = require('express');
const router = express.Router();
const moment = require('moment');
const app = require('../app');

const reviews = require('./data/reviews');
const pharmacies = require('./data/pharmacies');

// Create local storage for opening times
const localStorage = new LocalStorage('./scratch');

let recentChangeMade = false;
// let contactDetailsConfirmed = false;
// let facilitiesConfirmed = false;
// let servicesConfirmed = false;

moment.locale('en-GB');

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
  res.redirect('/dentists/leave-review/rating-question-3');
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

// Branching - Profile Editor
router.post('/address', function (req, res) {
  let address1 = req.body.address1;

  if (!address1) {
    res.redirect('/editor/edit-address?error=true');
  } else {
    res.redirect('/editor/manage-profile');
  }
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

router.post('/profile-viewer/live/gps/can-register/inside-catchment/register', (req, res) => {
  res.redirect('/profile-viewer/live/gps/can-register/inside-catchment/success')
})

module.exports = {
  router: router,
  localStorage: localStorage,
  recentChangeMade
};
