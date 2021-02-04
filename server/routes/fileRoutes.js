const router = require('express').Router();
const fileController = require('../controllers/fileController');
const middleware = require('../helpers/middleware');

router.get('/download/:id', fileController.downloadFile);


module.exports = router;