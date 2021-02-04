'use strict';
var Project = require('../model/projectModel');
var File = require('../model/filesModel');
var multer = require('multer')
var fs = require('fs');

exports.insertProject = function (req, res) {
  var newProject = new Project(req.body);
  newProject.created_date = new Date();
  newProject.user_id = req.user.id;
  if (!newProject) {
    res.json({
      error: true,
      message: 'Please fill all fields'
    });
  } else {
    Project.newProject(newProject, function (err, projectId) {
      if (err)
        res.send(err);
      if (err) {
        console.log(err);
      } else {
        newProject.id = projectId;
        res.json({
          project: newProject
        });
      }
    });
  }
};

exports.upload = function (req, res) {
  var project_id = req.params.id;
  var fileDir = 'resources/files/' + project_id + '/input';
  var fileName = '';
  if (!fs.existsSync(fileDir)) {
    fs.mkdirSync(fileDir, { recursive: true });
  }
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, fileDir)
    },
    filename: function (req, file, cb) {
      fileName = file.originalname;
      cb(null, fileName)
    }
  })

  const upload = multer({ storage: storage }).single('file')

  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err)
    } else if (err) {
      return res.status(500).json(err)
    }
    var file = {}
    file.name = fileName;
    file.uploaded_date = new Date();
    file.type = 'uploaded';
    file.folder = 'input'
    file.project_id = project_id;
    File.newFile(file, function (err, res) {
      if (err) {
        console.log(err);
      }
    });
    return res.json({
      success: true,
      message: 'the file has been uploaded successfully'
    })

  })
};
exports.updateProject = function (req, res) {
  var id = req.query.id;
  Project.updateProjectById(id, req.body.data, function (err, result) {
    if (err) {
      console.log(err);
      res.json({
        success: false,
        error: true
      });
    } else {
      Project.getProjectsById(id, function (err, result) {
        if (err || !result) {
          console.log(err);
        } else {
          if (result[0].status == 'processing') {
            let childProcessController = require('./pythonProcessController');
            childProcessController.startPythonService(id);
          }
          res.json({
            success: true,
            project: result[0]
          });
        }
      })
    }
  });
};

exports.getProjectsById = function (req, res) {
  var id = req.query.id;
  if (!id) {
    res.json({
      error: true,
      message: 'No user id provided'
    });
  } else {
    Project.getProjectsById(id, function (err, result) {
      if (err)
        console.log(err);
      res.json({
        success: true,
        project: result[0]
      });
    })
  }
};

exports.getProjectsByUserId = function (req, res) {
  var userId = req.query.user_id;
  if (!userId) {
    res.json({
      error: true,
      message: 'No user id provided'
    });
  } else {
    Project.getProjectsByUserId(userId, function (err, result) {
      if (err)
        console.log(err);
      res.json({
        success: true,
        projects: result
      });
    })
  }
};


exports.deleteProject = function (req, res) {
  var projectId = req.body.id;
  Project.removeProjectById(projectId, function (err, user) {
    if (err)
      res.send(err);
    res.json({
      message: 'Project successfully deleted'
    });
  });
};

exports.getFilesByProjectId = function (req, res) {
  var project_id = req.query.project_id;
  console.log(project_id);
  if (!project_id) {
    res.json({
      error: true,
      message: 'No project id provided'
    });
  } else {
    File.getByProjectId(project_id, function (err, result) {
      if (err)
        console.log(err);
      res.json({
        success: true,
        files: result
      });
    })
  }
};