const router = require('express').Router();
const settingsController = require('../controllers/settingsController');
const middleware = require('../helpers/middleware')

router.get('/:userid', middleware.checkToken, settingsController.getBillingByUserId);
router.post('/addbilling', middleware.checkToken, settingsController.insertBilling);
router.post('/updatebilling/:id', middleware.checkToken, settingsController.updateBilling);
router.post('/delete-account', middleware.checkToken, settingsController.deleteAccount);

module.exports = router;