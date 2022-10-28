const LocalStorage = require('node-localstorage').LocalStorage;

// External dependencies
const express = require('express');
const router = express.Router();
const moment = require('moment');
const app = require('../../../../app');

const reviews = require('../../../data/reviews');
const hospitals = require('../../../data/hospitals/hospitals');
const hospitalDepartmentsList = require('../../../data/hospitals/departmentList');
const hospitalDepartments = require('../../../data/hospitals/departments');

// Create local storage for opening times
const localStorage = new LocalStorage('./scratch');

let recentChangeMade = false;
let contactDetailsConfirmed = false;
const alphabet = [];
for (var i = 65; i <= 90; i ++) {
  alphabet.push(String.fromCharCode(i));
}

moment.locale('en-GB');

hospitals.sort((a, b) => {
  return b.comments - a.comments
});

router.get('/editor/profiles/royal/manage-profile', function (req, res) {
  let palsContactDetailsConfirmed = localStorage.getItem('palsContactDetailsConfirmed')
  let palsContactDetailsUpdatedDate = localStorage.getItem('palsContactDetailsUpdatedDate')
  palsContactDetailsConfirmed = JSON.parse(palsContactDetailsConfirmed);

  res.render('profile-manager/hospitals/editor/profiles/royal/manage-profile', {
    palsContactDetailsConfirmed,
    palsContactDetailsUpdatedDate,
    recentChangeMade
  });
});

router.get('/editor/profiles', (req, res) => {
  recentChangeMade = false;
  currentHospitals = hospitals.slice(0, 15);
  res.render('profile-manager/hospitals/editor/profiles/index', { currentHospitals, hospitals });
});

router.get('/editor/profiles/index-2', (req, res) => {
  currentHospitals = hospitals.slice(15);
  res.render('profile-manager/hospitals/editor/profiles/index-2', { currentHospitals, hospitals });
});

router.post('/editor/profiles/search-hospital', (req, res) => {
  let hospitalSearch = req.body.searchHospital;
  currentHospitals = hospitals.filter(hospital => hospital.Name.toLowerCase().includes(hospitalSearch.toLowerCase()))
  res.render('profile-manager/hospitals/editor/profiles/index', { currentHospitals })
})

router.post('/editor/profiles/royal/contact-details/pals-telephone', (req, res) => {
  res.redirect('/profile-manager/hospitals/editor/profiles/royal/contact-details/pals-email')
})

router.post('/editor/profiles/royal/contact-details/pals-email', (req, res) => {
  res.redirect('/profile-manager/hospitals/editor/profiles/royal/contact-details/pals-contact-details-check')
})

router.post('/editor/profiles/royal/contact-details/pals-contact-details-check', (req, res) => {
  localStorage.setItem('palsContactDetailsConfirmed', true);
  localStorage.setItem('palsContactDetailsUpdatedDate', moment().format('DD MMMM YYYY'));
  res.redirect('/profile-manager/hospitals/editor/profiles/royal/manage-profile')
})

// DISPLAY HOSPITAL DEPARTMENTS WITH PAGINATION
router.get('/editor/profiles/royal/departments/index', (req, res) => {
  currentDepartments = hospitalDepartments.slice(0, 15);
  res.render('profile-manager/hospitals/editor/profiles/royal/departments/index', { currentDepartments, hospitalDepartments })
})

router.get('/editor/profiles/royal/departments/index-2', (req, res) => {
  currentDepartments = hospitalDepartments.slice(15, 30);
  res.render('profile-manager/hospitals/editor/profiles/royal/departments/index-2', { currentDepartments, hospitalDepartments })
})

router.get('/editor/profiles/royal/departments/index-3', (req, res) => {
  currentDepartments = hospitalDepartments.slice(30, 45);
  res.render('profile-manager/hospitals/editor/profiles/royal/departments/index-3', { currentDepartments, hospitalDepartments })
})

router.post('/editor/profiles/royal/departments/search-hospital-department', (req, res) => {
  let departmentSearch = req.body.searchDepartment;
  currentDepartments = hospitalDepartments.filter(department => department.toLowerCase().includes(departmentSearch.toLowerCase()))
  res.render('profile-manager/hospitals/editor/profiles/royal/departments/index-search', { currentDepartments })
})

router.get('/editor/profiles/royal/departments/add/add-departments', (req, res) => {
  res.render('profile-manager/hospitals/editor/profiles/royal/departments/add/add-departments', { hospitalDepartmentsList, alphabet })
})

router.get('/editor/profiles/royal/departments/remove/remove-departments', (req, res) => {
  currentDepartments = hospitalDepartments.slice(0, 15);
  res.render('profile-manager/hospitals/editor/profiles/royal/departments/remove/remove-departments', { currentDepartments, hospitalDepartments })
})

router.get('/editor/profiles/royal/departments/urology/manage-urology', function (req, res) {
  let hospitalDepartmentContactDetailsConfirmed = localStorage.getItem('hospitalDepartmentContactDetailsConfirmed')
  let hospitalDepartmentContactDetailsUpdatedDate = localStorage.getItem('hospitalDepartmentContactDetailsUpdatedDate')
  let hospitalWebsiteConfirmed = localStorage.getItem('hospitalWebsiteConfirmed')
  let hospitalWebsiteUpdatedDate = localStorage.getItem('hospitalWebsiteUpdatedDate')
  hospitalDepartmentContactDetailsConfirmed = JSON.parse(hospitalDepartmentContactDetailsConfirmed);
  hospitalWebsiteConfirmed = JSON.parse(hospitalWebsiteConfirmed);

  res.render('profile-manager/hospitals/editor/profiles/royal/departments/urology/manage-urology', {
    hospitalDepartmentContactDetailsConfirmed,
    hospitalDepartmentContactDetailsUpdatedDate,
    hospitalWebsiteConfirmed,
    hospitalWebsiteUpdatedDate,
  });
});

router.post('/editor/profiles/royal/departments/urology/contact-details/phone-edit', (req, res) => {
  res.redirect('/profile-manager/hospitals/editor/profiles/royal/departments/urology/contact-details/contact-details-check')
})

router.post('/editor/profiles/royal/departments/urology/contact-details/contact-details-check', (req, res) => {
  localStorage.setItem('hospitalDepartmentContactDetailsConfirmed', true);
  localStorage.setItem('hospitalDepartmentContactDetailsUpdatedDate', moment().format('DD MMMM YYYY'));
  res.redirect('/profile-manager/hospitals/editor/profiles/royal/departments/urology/manage-urology')
})

router.post('/editor/profiles/royal/departments/urology/website/website-edit', (req, res) => {
  res.redirect('/profile-manager/hospitals/editor/profiles/royal/departments/urology/website/website-check')
})

router.post('/editor/profiles/royal/departments/urology/website/website-check', (req, res) => {
  localStorage.setItem('hospitalWebsiteConfirmed', true);
  localStorage.setItem('hospitalWebsiteUpdatedDate', moment().format('DD MMMM YYYY'));
  res.redirect('/profile-manager/hospitals/editor/profiles/royal/departments/urology/manage-urology')
})

module.exports = {
  router: router,
  localStorage: localStorage,
  recentChangeMade
};
