// External dependencies
const express = require('express');
const router = express.Router();


// Documentation router
router.get('/', function(req , res){ 
    res.render('index');
  });
  
  
  // Branching - Leave a review

  router.post('/rating-review', function (req, res) {
    let month = req.body.month;
    let year = req.body.year;
  
    if (year < 2017) {
      res.redirect('/leave-review/visitdate?error=true')
    } 
    else if (!month) {
      res.redirect('/leave-review/visitdate?error=true')
    } 
    else {
      res.redirect('/leave-review/rating-question-1')
    }
  });

  router.post('/q1', function (req, res) {
    let familyfriends = req.body.familyfriends;

    if (!familyfriends){
      res.redirect('/leave-review/rating-question-1?error=true')
    }
    else {
      res.redirect('/leave-review/rating-question-2')
    }
  });

  router.post('/q2', function (req, res) {
    let title = req.body.title;
    let details = req.body.details;

    if (!title) {
      res.redirect('/leave-review/rating-question-2?error=true')
    }
    else if (!details){
      res.redirect('/leave-review/rating-question-2?error=true')
    }
    else {
      res.redirect('/leave-review/rating-question-3')
    }
  });

  router.post('/q3', function (req, res) {
    let email = req.body.email;
    let confirmemail = req.body.confirmemail;
    let displayname = req.body.displayname;

    if (!email) {
      res.redirect('/leave-review/rating-question-3?error=true')
    }
    else if (!confirmemail){
      res.redirect('/leave-review/rating-question-3?error=true')
    }
    else if (!displayname){
      res.redirect('/leave-review/rating-question-3?error=true')
    }
    else {
      res.redirect('/leave-review/rating-question-4')
    }
  });

  router.post('/q4', function (req, res) {
    let furtherratings = req.body.furtherratings;

    if (!furtherratings){
      res.redirect('/leave-review/rating-question-4?error=true')
    } 
    else if (furtherratings == "yes"){
      res.redirect('/leave-review/rating-question-5')
    }
    else {
      res.redirect('/leave-review/rating-question-10')
    }
  });

  router.post('/q5', function (req, res) {
    let appointmentwaitingtime = req.body.appointmentwaitingtime;

    if (!appointmentwaitingtime){
      res.redirect('/leave-review/rating-question-5?error=true')
    }
    else {
      res.redirect('/leave-review/rating-question-6')
    }
  });

  router.post('/q6', function (req, res) {
    let dignityrespect = req.body.dignityrespect;

    if (!dignityrespect){
      res.redirect('/leave-review/rating-question-6?error=true')
    }
    else {
      res.redirect('/leave-review/rating-question-7')
    }
  });

  router.post('/q7', function (req, res) {
    let treatmentdecisions = req.body.treatmentdecisions;

    if (!treatmentdecisions){
      res.redirect('/leave-review/rating-question-7?error=true')
    }
    else {
      res.redirect('/leave-review/rating-question-8')
    }
  });

  router.post('/q8', function (req, res) {
    let treatmentcostsinfo = req.body.treatmentcostsinfo;

    if (!treatmentcostsinfo){
      res.redirect('/leave-review/rating-question-8?error=true')
    }
    else {
      res.redirect('/leave-review/rating-question-9')
    }
  });

  router.post('/q9', function (req, res) {
    let treatmentoutcome = req.body.treatmentoutcome;

    if (!treatmentoutcome){
      res.redirect('/leave-review/rating-question-9?error=true')
    }
    else {
      res.redirect('/leave-review/rating-question-10')
    }
  });




  // Branching - Report a comment

  router.post('/rcq1', function (req, res) {
    let reportreason = req.body.reportreason;

    if (!reportreason){
      res.redirect('/report-comment/rcq1?error=true')
    } 
    else if (reportreason == "Offensive content"){
      res.redirect('/report-comment/rcq2')
    }
    else if (reportreason == "Innacurate content"){
      res.redirect('/report-comment/rcq2')
    }
    else if (reportreason == "Incorrect organisation"){
      res.redirect('/report-comment/rcq2')
    }
    else if (reportreason == "Other"){
      res.redirect('/report-comment/rcq2')
    }
    else {
      res.redirect('/report-comment/rcq2')
    }
  });

  router.post('/rcq2', function (req, res) {
    let moredetail = req.body.moredetail;

    if (!moredetail){
      res.redirect('/report-comment/rcq2?error=true')
    } 
    else {
      res.redirect('/report-comment/rcq3')
    }
  });

  router.post('/rcq3', function (req, res) {
    let emailaddress = req.body.emailaddress;
    let confirmemailaddress = req.body.confirmemailaddress;

    if (!emailaddress){
      res.redirect('/report-comment/rcq3?error=true')
    } 
    if (!confirmemailaddress){
      res.redirect('/report-comment/rcq3?error=true')
    } 
    else {
      res.redirect('/report-comment/rcca')
    }
  });

  router.post('/confirmation', function (req, res) {
    let moredetail = req.body.moredetail;

    if (!moredetail){
      res.redirect('/report-comment/rcq2?error=true')
    } 
    else {
      res.redirect('/report-comment/rcq3')
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

// Add your routes here -  above the module.exports line

module.exports = router; 
