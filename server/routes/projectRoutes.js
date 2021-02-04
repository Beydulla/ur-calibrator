const router = require('express').Router();
const projectController = require('../controllers/projectController');
const childProcessController = require('../controllers/pythonProcessController')
const middleware = require('../helpers/middleware')

router.get('/', middleware.checkToken, projectController.getProjectsById);
router.get('/user', middleware.checkToken, projectController.getProjectsByUserId);
router.delete('/delete', middleware.checkToken, projectController.deleteProject);
router.post('/new',middleware.checkToken, projectController.insertProject);
router.post('/update',middleware.checkToken, projectController.updateProject);
router.post('/:id/upload',projectController.upload);
router.get('/files',middleware.checkToken, projectController.getFilesByProjectId);
router.get('/python', childProcessController.startPythonService );
router.post('/python/callback/:projectId', childProcessController.pythonCallBack );

module.exports = router;