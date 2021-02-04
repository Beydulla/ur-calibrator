const router = require('express').Router();
const paymentCotroller = require('../controllers/paymentCotroller');
const billingController = require('../controllers/billingController')
const document = require('../billingo/billingoDocument')
const middleware = require('../helpers/middleware')


router.get('/startPayment/:projectId', middleware.checkToken, paymentCotroller.startPayment);
router.post('/barion/callback', paymentCotroller.handleCallBack);
router.get('/billing-history', middleware.checkToken, paymentCotroller.getBillingHistoryByUserId);
router.get('/create/document', billingController.createDocument);
router.get('/create/partner', billingController.createPartner);
router.get('/download/:id', document.downloadUrl);


module.exports = router;