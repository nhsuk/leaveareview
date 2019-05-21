// External dependencies
const express = require('express');
const router = express.Router();


// Documentation router
router.get('/', function(req , res){ 
    res.render('index');
  });
  
  
  // Branching

  router.post('/rating-review', function (req, res) {
    let year = req.body.year;
  
    if (year >= 2017){
      res.redirect('/leave-review/rating-question-1')
    }
    else if (year < 2017) {
      res.redirect('/leave-review/visitdate')
    } 
    else {
      res.redirect('/leave-review/')
    }
  });

  router.post('/q1', function (req, res) {
    let familyfriends = req.body.familyfriends;

    if (familyfriends <= 5){
      res.redirect('/leave-review/rating-question-2')
    }
    else {
      res.redirect('/leave-review/rating-question-1')
    }
  });

  router.post('/q2', function (req, res) {
    let furtherratings = req.body.furtherratings;

    if (furtherratings == "yes"){
      res.redirect('/leave-review/rating-question-3')
    }
    else {
      res.redirect('/leave-review/rating-question-8')
    }
  });

  router.post('/q3', function (req, res) {
    let appointmentwaitingtime = req.body.appointmentwaitingtime;

    if (appointmentwaitingtime <= 5){
      res.redirect('/leave-review/rating-question-4')
    }
    else {
      res.redirect('/leave-review/rating-question-3')
    }
  });

  router.post('/q4', function (req, res) {
    let dignityrespect = req.body.dignityrespect;

    if (dignityrespect <= 5){
      res.redirect('/leave-review/rating-question-5')
    }
    else {
      res.redirect('/leave-review/rating-question-4')
    }
  });

  router.post('/q5', function (req, res) {
    let treatmentdecisions = req.body.treatmentdecisions;

    if (treatmentdecisions <= 5){
      res.redirect('/leave-review/rating-question-6')
    }
    else {
      res.redirect('/leave-review/rating-question-5')
    }
  });

  router.post('/q6', function (req, res) {
    let treatmentcostsinfo = req.body.treatmentcostsinfo;

    if (treatmentcostsinfo <= 5){
      res.redirect('/leave-review/rating-question-7')
    }
    else {
      res.redirect('/leave-review/rating-question-6')
    }
  });

  router.post('/q7', function (req, res) {
    let treatmentoutcome = req.body.treatmentoutcome;

    if (treatmentoutcome <= 5){
      res.redirect('/leave-review/rating-question-8')
    }
    else {
      res.redirect('/leave-review/rating-question-7')
    }
  });

  router.post('/q8', function (req, res) {
    let title = req.body.title;
    let details = req.body.details;

    if (title == '') {
      res.redirect('/leave-review/rating-question-8')
    }
    else if (details == ''){
      res.redirect('/leave-review/rating-question-8')
    }
    else {
      res.redirect('/leave-review/rating-question-9')
    }
  });

  router.post('/q9', function (req, res) {
    let email = req.body.email;
    let confirmemail = req.body.confirmemail;
    let displayname = req.body.displayname;

    if (email == '') {
      res.redirect('/leave-review/rating-question-9')
    }
    else if (confirmemail == ''){
      res.redirect('/leave-review/rating-question-9')
    }
    else if (displayname == ''){
      res.redirect('/leave-review/rating-question-9')
    }
    else {
      res.redirect('/leave-review/rating-question-10')
    }
  });


// Add your routes here - above the module.exports line

module.exports = router;
