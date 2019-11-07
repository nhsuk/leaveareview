const LocalStorage = require('node-localstorage').LocalStorage;

// External dependencies
const express = require('express');
const router = express.Router();
const pharmacies = require('./data/pharmacies');
const moment = require('moment');
const app = require('../app');

moment.locale('en-GB');
// Documentation router
router.get('/', function(req , res){
  // Save default opening times to local storage
  localStorage.setItem('localOpeningTimes', JSON.stringify(emptyOpeningTimes));
  res.render('index');
});


  // Branching - Leave a review

  router.post('/rating-review', function (req, res) {
    let month = req.body.month;
    let year = req.body.year;

    if (year < 2017) {
      res.redirect('/dentists/leave-review/visitdate?error=true')
    }
    else if (!month) {
      res.redirect('/dentists/leave-review/visitdate?error=true')
    }
    else {
      res.redirect('/dentists/leave-review/rating-question-1')
    }
  });

  router.post('/q1', function (req, res) {
    let familyfriends = req.body.familyfriends;

    if (!familyfriends){
      res.redirect('/dentists/leave-review/rating-question-1?error=true')
    }
    else {
      res.redirect('/dentists/leave-review/rating-question-2')
    }
  });

  router.post('/q2', function (req, res) {
    let title = req.body.title;
    let details = req.body.details;

    if (!title) {
      res.redirect('/dentists/leave-review/rating-question-2?error=true')
    }
    else if (!details){
      res.redirect('/dentists/leave-review/rating-question-2?error=true')
    }
    else {
      res.redirect('/dentists/leave-review/rating-question-3')
    }
  });

  router.post('/q3', function (req, res) {
    let email = req.body.email;
    let confirmemail = req.body.confirmemail;
    let displayname = req.body.displayname;

    if (!email) {
      res.redirect('/dentists/leave-review/rating-question-3?error=true')
    }
    else if (!confirmemail){
      res.redirect('/dentists/leave-review/rating-question-3?error=true')
    }
    else if (!displayname){
      res.redirect('/dentists/leave-review/rating-question-3?error=true')
    }
    else {
      res.redirect('/dentists/leave-review/rating-question-4')
    }
  });

  router.post('/q4', function (req, res) {
    let furtherratings = req.body.furtherratings;

    if (!furtherratings){
      res.redirect('/dentists/leave-review/rating-question-4?error=true')
    }
    else if (furtherratings == "yes"){
      res.redirect('/dentists/leave-review/rating-question-5')
    }
    else {
      res.redirect('/dentists/leave-review/rating-question-10')
    }
  });

  router.post('/q5', function (req, res) {
    let appointmentwaitingtime = req.body.appointmentwaitingtime;

    if (!appointmentwaitingtime){
      res.redirect('/dentists/leave-review/rating-question-5?error=true')
    }
    else {
      res.redirect('/dentists/leave-review/rating-question-6')
    }
  });

  router.post('/q6', function (req, res) {
    let dignityrespect = req.body.dignityrespect;

    if (!dignityrespect){
      res.redirect('/dentists/leave-review/rating-question-6?error=true')
    }
    else {
      res.redirect('/dentists/leave-review/rating-question-7')
    }
  });

  router.post('/q7', function (req, res) {
    let treatmentdecisions = req.body.treatmentdecisions;

    if (!treatmentdecisions){
      res.redirect('/dentists/leave-review/rating-question-7?error=true')
    }
    else {
      res.redirect('/dentists/leave-review/rating-question-8')
    }
  });

  router.post('/q8', function (req, res) {
    let treatmentcostsinfo = req.body.treatmentcostsinfo;

    if (!treatmentcostsinfo){
      res.redirect('/dentists/leave-review/rating-question-8?error=true')
    }
    else {
      res.redirect('/dentists/leave-review/rating-question-9')
    }
  });

  router.post('/q9', function (req, res) {
    let treatmentoutcome = req.body.treatmentoutcome;

    if (!treatmentoutcome){
      res.redirect('/dentists/leave-review/rating-question-9?error=true')
    }
    else {
      res.redirect('/dentists/leave-review/rating-question-10')
    }
  });




  // Branching - Report a comment

  router.post('/rcq1', function (req, res) {
    let reportreason = req.body.reportreason;

    if (!reportreason){
      res.redirect('/dentists/report-comment/rcq1?error=true')
    }
    else if (reportreason == "Offensive content"){
      res.redirect('/dentists/report-comment/rcq2')
    }
    else if (reportreason == "Innacurate content"){
      res.redirect('/dentists/report-comment/rcq2')
    }
    else if (reportreason == "Incorrect organisation"){
      res.redirect('/dentists/report-comment/rcq2')
    }
    else if (reportreason == "Other"){
      res.redirect('/dentists/report-comment/rcq2')
    }
    else {
      res.redirect('/dentists/report-comment/rcq2')
    }
  });

  router.post('/rcq2', function (req, res) {
    let moredetail = req.body.moredetail;

    if (!moredetail){
      res.redirect('/dentists/report-comment/rcq2?error=true')
    }
    else {
      res.redirect('/dentists/report-comment/rcq3')
    }
  });

  router.post('/rcq3', function (req, res) {
    let emailaddress = req.body.emailaddress;
    let confirmemailaddress = req.body.confirmemailaddress;

    if (!emailaddress){
      res.redirect('/dentists/report-comment/rcq3?error=true')
    }
    if (!confirmemailaddress){
      res.redirect('/dentists/report-comment/rcq3?error=true')
    }
    else {
      res.redirect('/dentists/report-comment/rcca')
    }
  });

  router.post('/confirmation', function (req, res) {
    let moredetail = req.body.moredetail;

    if (!moredetail){
      res.redirect('/dentists/report-comment/rcq2?error=true')
    }
    else {
      res.redirect('/dentists/report-comment/rcq3')
    }
  });

 // Branching - Org Response Tool

  router.post('/process-response', function (req, res) {
    let response = req.body.yourresponse;

    if (response == '') {
      res.redirect('/org-response/response-error')
    }
    else {
      res.redirect('/org-response/response-confirm')
    }
  });



// Branching - Profile Editor

router.post('/display-name', function (req, res) {
  let alias1 = req.body.alias1;

  if (!alias1) {
    res.redirect('/editor/edit-alias?error=true')
  }
  else {
    res.redirect('/editor/edit-alias-choose-displayname')
  }
});

router.post('/display-name-2', function (req, res) {
  let displayname = req.body.displayname;

  if (!displayname) {
    res.redirect('/editor/edit-alias-choose-displayname?error=true')
  }
  else {
    res.redirect('/editor/manage-profile')
  }
});

router.post('/address', function (req, res) {
  let address1 = req.body.address1;

  if (!address1) {
    res.redirect('/editor/edit-address?error=true')
  }
  else {
    res.redirect('/editor/manage-profile')
  }
});

router.post('/telephone-online', function (req, res) {
  let telephone = req.body.telephone;

  if (!telephone) {
    res.redirect('/editor/edit-telephone-online?error=true')
  }
  else {
    res.redirect('/editor/manage-profile')
  }
});

  // Branching - Ask a doctor a question

  router.post('/aaq2', function (req, res) {
    let practicename = req.body.practicename;

    if (!practicename){
      res.redirect('/gps/askaquestion/aaq1?error=true')
    } 
    else {
      res.redirect('/gps/askaquestion/aaq2')
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

    if (!name){
      res.redirect('/gps/askaquestion/aaq2?error=true')
    } 
    if (!day){
      res.redirect('/gps/askaquestion/aaq2?error=true')
    } 
    if (!month){
      res.redirect('/gps/askaquestion/aaq2?error=true')
    }
    if (!year){
      res.redirect('/gps/askaquestion/aaq2?error=true')
    }
    if (!year){
      res.redirect('/gps/askaquestion/aaq2?error=true')
    }
    if (!emailaddress){
      res.redirect('/gps/askaquestion/aaq2?error=true')
    } 
    if (!confirmemailaddress){
      res.redirect('/gps/askaquestion/aaq2?error=true')
    }
    else {
      res.redirect('/gps/askaquestion/aaq3')
    }
  });

router.post('/search-profiles', (req, res) => {
  let searchResult = req.body.searchQuery;
  const result = findService(searchResult);
  console.log(result);
  res.render('editor/select-profiles', { result });
});

function findService(query) {
  const servicesFound = pharmacies.filter(pharm => Object.values(pharm).find(val => val.includes(query)));
  return servicesFound;
}

const days = {
  MONDAY: {
    key: 'monday',
    display: 'Monday'
  },
  TUESDAY: {
    key: 'tuesday',
    display: 'Tuesday'
  },
  WEDNESDAY: {
    key: 'wednesday',
    display: 'Wednesday'
  },
  THURSDAY: {
    key: 'thursday',
    display: 'Thursday'
  },
  FRIDAY: {
    key: 'friday',
    display: 'Friday'
  },
  SATURDAY: {
    key: 'saturday',
    display: 'Saturday'
  },
  SUNDAY: {
    key: 'sunday',
    display: 'Sunday'
  },
}

const getDay = req => days[req.params.day.toUpperCase()];

// Create local storage for opening times
const localStorage = new LocalStorage('./scratch');

// Create default opening times
const emptyOpeningTimes = Object.keys(days).map((key) => ({
  'name': days[key].display,
  'times': []
}))

// Save default opening times to local storage
localStorage.setItem('localOpeningTimes', JSON.stringify(emptyOpeningTimes));

router.get('/editor/opening-times/days', (_, res) => {
  res.render('editor/opening-times/days', { 
    openingTimes: JSON.parse(localStorage.getItem('localOpeningTimes'))
  });
});

router.get('/editor/opening-times/days/:day', (req, res) => {
  const dayObj = getDay(req);
  res.render('editor/opening-times/day', { dayObj });
});

router.post('/editor/opening-times/days/:day/set' , (req, res) => {
  // Existing opening times from localstorage
  const localOpeningTimes = JSON.parse(localStorage.getItem('localOpeningTimes'));
  const dayObj = getDay(req);

  if (req.body.open === 'yes') {
    res.render('editor/opening-times/set', { dayObj });
  } else {
    const newOpeningTimes = localOpeningTimes.map(({ name, times }) => ({
      name,
      'times': dayObj.display === name ? [] : times,
    }));
  
    // Set localstorage times to new times
    localStorage.setItem('localOpeningTimes', JSON.stringify(newOpeningTimes));
    res.redirect('/editor/opening-times/days');
  }
});

router.post('/editor/opening-times/days/:day/copy' , (req, res) => {
  const dayObj = getDay(req);
  const daysToDisplay = {...days}
  delete daysToDisplay[dayObj.key.toUpperCase()];
  res.render('editor/opening-times/copy', { 
    dayObj,
    daysToDisplay, 
    times: req.body
  });
});

router.post('/editor/opening-times/days', (req, res) => {
  // Existing opening times from localstorage
  const localOpeningTimes = JSON.parse(localStorage.getItem('localOpeningTimes'));

  // Get an array of opening times from the request body
  const newTimes = Object.keys(req.body).filter(key => !days[key.toUpperCase()])
    .map(timeKey => req.body[timeKey])
    .filter(Boolean);

  // Build opening times object by adding times to all days sent in the request body
  const newOpeningTimes = localOpeningTimes.map(({ name, times }) => ({
    name,
    'times': req.body[name.toLowerCase()] ? newTimes : times
  }));

  // Set localstorage times to new times
  localStorage.setItem('localOpeningTimes', JSON.stringify(newOpeningTimes));

  console.log(newOpeningTimes); 
  // Redirect to page which will display times from new localstorage
  res.redirect('/editor/opening-times/days');
});

router.post('/editor/opening-times/bank-holiday/day' , (req, res) => {
  if(req.body.open === 'yes') {
    res.redirect('/editor/opening-times/bank-holiday/opening-time');
  } else {
    res.redirect('/editor/opening-times/bank-holiday/days');
  }
});

router.post('/editor/opening-times/bank-holiday/opening-time', (req, res) => {
  let firstTime;
  let secondTime;
  let thirdTime;
  if(req.body.bankHolOpenTime1) {
    firstTime = `${req.body.bankHolOpenTime1} to ${req.body.bankHolCloseTime1}`;
  }
  if(req.body.bankHolOpenTime2) {
    secondTime = `${req.body.bankHolOpenTime2} to ${req.body.bankHolCloseTime2}`;
  }
  if(req.body.bankHolOpenTime3) {
    thirdTime = `${req.body.bankHolOpenTime3} to ${req.body.bankHolCloseTime3}`;
  }
  res.render('editor/opening-times/bank-holiday/days', { firstTime, secondTime, thirdTime });
});

let tempChanges = [];

router.get('/editor/opening-times/temporary-changes/temporary-changes', (req, res) => {
  if(tempChanges.length === 0) {
    res.redirect('/editor/opening-times/temporary-changes/temporary-changes-date');
  }
});

router.post('/editor/opening-times/temporary-changes/temporary-changes-date', (req, res) => {
  let tempDate = `${req.body.tempChangeDay} ${req.body.tempChangeMonth} ${req.body.tempChangeYear}`;
  tempDate = moment(tempDate, "DD MMMM YYYY").format("DD MMMM YYYY");
  res.redirect(`/editor/opening-times/temporary-changes/temporary-changes-time?date=${tempDate}`);
});

router.get('/editor/opening-times/temporary-changes/temporary-changes-time', (req, res) => {
  let temporaryDate = req.query.date;
  res.render('editor/opening-times/temporary-changes/temporary-changes-time', { temporaryDate });
});

router.post('/editor/opening-times/temporary-changes/temporary-changes-time', (req, res) => {
  function getTime() {
    let time = [];
    if(req.body.open24Hours) {
      time.push('Open 24 hours');
    }
    if(req.body.tempOpenTime1) {
      time.push(`${req.body.tempOpenTime1} ${req.body.tempCloseTime1}`);
    }
    if(req.body.tempOpenTime2) {
      time.push(`${req.body.tempOpenTime2} ${req.body.tempCloseTime2}`);
    }
    if(req.body.tempOpenTime3) {
      time.push(`${req.body.tempOpenTime3} ${req.body.tempCloseTime3}`);
    }
    return time;
  }
  tempChange = {
    date: req.body.tempDateHidden,
    time: getTime(),
  }
  tempChanges.push(tempChange);
  res.render('editor/opening-times/temporary-changes/temporary-changes', { tempChanges });
});

module.exports = router;
