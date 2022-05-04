const { body } = require('express-validator');

module.exports = {
  '/profile-manager/pharmacies/editor/contact-details/contact-details-phone-edit': [
		body('telephone').isLength(11).withMessage('Telephone number must be 11 digits'),
		body('telephone').not().isEmpty().withMessage('Enter a telephone number'),
	],
	'/profile-manager/pharmacies/editor-login/register/previous-email': [
		body('email').isEmail().withMessage("Enter non-NHSmail address"),
		body('email').custom((value) => {
			if (value.includes('nhs.net')) {
				throw new Error('Enter non-NHSmail address (not ending nhs.net)') 
			}
			return true
		})
	],
	'/profile-manager/pharmacies/editor-login/register/confirmation-code': [
		body('confirmationCode').custom((value) => {
			if (value !== 'QWER1234') {
				throw new Error('Enter the confirmation code') 
			}
			return true;
		})
	],
	'/profile-manager/dentists/editor/availability/accepting-patients': [
		body('patientsAccepting').custom((value) => {
		  if (value.includes('Adults 18 and over') && !value.includes('Adults entitled to free dental care')) {
				throw new Error('You need to select adults entitled to free dental care too') 
			}	
			return true;
		})
	]
};
