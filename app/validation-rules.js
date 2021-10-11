const { body } = require('express-validator');

module.exports = {
  '/editor/contact-details-phone-edit': [
		body('telephone').isLength(11).withMessage('Telephone number must be 11 digits'),
		body('telephone').not().isEmpty().withMessage('Enter a telephone number'),
	],
	'/editor-login/register/previous-email': [
		body('email').isEmail().withMessage("Enter an email address"),
		body('email').custom((value) => {
			if (value.includes('nhs.net')) {
				throw new Error('Email cannot contain @nhs.net') 
			}
			return true
		})
	],
	'/editor-login/register/confirmation-code': [
		body('confirmationCode').custom((value) => {
			if (value !== 'QWER1234') {
				throw new Error('Enter the confirmation code we emailed') 
			}
			return true;
		})
	]

};
