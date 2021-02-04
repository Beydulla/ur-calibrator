const router = require('express').Router();
const userController = require('../controllers/userController');
const middleware = require('../helpers/middleware')

router.get('/',middleware.checkToken, userController.list_all_users);
router.post('/add', userController.create_user);
router.get('/:id', userController.get_User);
router.post('/update/:id', userController.update_user);
router.get('/delete/:id', userController.delete_user);
router.post('/authenticate', userController.authenticate_user);
router.post('/confirm/:key', userController.confirmEmail);
router.post('/reset-password', middleware.checkToken, userController.resetPassword);
router.post('/forgot-password', userController.forgotPassword);
router.post('/reset-forgotten-password', userController.resetForgottenPassword);

module.exports = router;