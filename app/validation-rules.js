const { body } = require('express-validator');

module.exports = {
  '/editor/contact-details-phone-edit': [
		body('telephone').isLength(11).withMessage('Telephone number must be 11 digits'),
		body('telephone').not().isEmpty().withMessage('Enter a telephone number'),
	]
};
