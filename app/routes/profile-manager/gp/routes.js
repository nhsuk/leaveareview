const LocalStorage = require('node-localstorage').LocalStorage;

// External dependencies
const express = require('express');
const router = express.Router();
const moment = require('moment');
const app = require('../../../../app');

// Create local storage for opening times
const localStorage = new LocalStorage('./scratch');

let recentChangeMade = false;
let patientRegistrationConfirmed = false;
let onlineRegistrationConfirmed = false;
let contactDetailsLastUpdatedDate = localStorage.getItem('contactDetailsUpdatedDate')
let openingTimesLastUpdatedDate = localStorage.getItem('openingTimesUpdatedDate')
let facilitiesLastUpdatedDate = localStorage.getItem('facilitiesUpdatedDate')
let servicesLastUpdatedDate = localStorage.getItem('servicesUpdatedDate')
let patientRegistrationLastUpdatedDate = localStorage.getItem('patientRegistrationLastUpdatedDate')
let registerNewPatientsLastUpdatedDate = localStorage.getItem('registerNewPatientsLastUpdatedDate')
let gpRegServiceLastUpdatedDate = localStorage.getItem('gpRegServiceLastUpdatedDate')

moment.locale('en-GB');

router.get('/editor/manage-profile', function (req, res) {
  res.render('profile-manager/gp/editor/manage-profile', {
    contactDetailsLastUpdatedDate,
    openingTimesLastUpdatedDate,
    facilitiesLastUpdatedDate,
    servicesLastUpdatedDate,
		patientRegistrationLastUpdatedDate,
    recentChangeMade,
  });
});

router.get('/editor/patient-registration/index', (req, res) => {
	res.render('profile-manager/gp/editor/patient-registration/index', {
		patientRegistrationConfirmed,
		onlineRegistrationConfirmed,
		recentChangeMade,
		registerNewPatientsLastUpdatedDate
	})
})

router.post('/editor/patient-registration/new-patients/registering-new-patients', (req, res) => {
	if(req.body.newPatients === 'yes') {
		res.redirect('registering-new-patients-check');
	}
})

router.post('/editor/patient-registration/new-patients/registering-new-patients-check', (req, res) => {
  localStorage.setItem(
    'patientRegistrationLastUpdatedDate',
    moment().format('DD MMMM YYYY')
  );
	[recentChangeMade, patientRegistrationConfirmed] = [true, true];
	res.redirect('../gp-reg-service/index');
})

router.post('/editor/patient-registration/gp-reg-service/email-address', (req, res) => {
	res.redirect('verification-code');
})

router.post('/editor/patient-registration/gp-reg-service/verification-code', (req, res) => {
	res.redirect('extra-questions');
})

router.post('/editor/patient-registration/gp-reg-service/extra-questions', (req, res) => {
	res.redirect('check-answers');
})

router.post('/editor/patient-registration/gp-reg-service/check-answers', (req, res) => {
	onlineRegistrationConfirmed = true;
	res.redirect('confirmation');
})

router.post('/editor/patient-registration/gp-reg-service/opt-out/opt-out', (req, res) => {
	[recentChangeMade, onlineRegistrationConfirmed] = [true, false];
	res.redirect('../../');
})

module.exports = {
  router: router,
  localStorage: localStorage,
  recentChangeMade
};
