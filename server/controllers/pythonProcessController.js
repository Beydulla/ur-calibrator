const config = require("../config");
const { exec } = require('child_process');
const p = require('path')
const fs = require('fs');
var Project = require('../model/projectModel');
var File = require('../model/filesModel');
const templates = require('../email/emailTemplate')
const sendEmail = require('../email/emailSend')
const multer = require('multer')

exports.pythonCallBack = function (req, res) {
  const projectId = req.params.projectId
  let outputDirPath = 'resources/files/' + projectId + "/output"
  let urdfFileName = '';
  let dhFileName= '';
  let previewFileName= '';
  if (!fs.existsSync(outputDirPath)) {
    fs.mkdirSync(outputDirPath, { recursive: true });
  }
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, outputDirPath)
    },
    filename: function (req, file, cb) {
      let filename = file.originalname
      if(filename.includes('calibration_result')){
        urdfFileName = filename
      }else if(filename.includes('DH_Params')){
        dhFileName = filename
      }else{
        previewFileName = filename
      }
      cb(null, filename)
    }
  })
  const upload = multer({ storage: storage }).array("file")
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err)
    } else if (err) {
      return res.status(500).json(err)
    }
    createReportFile(projectId, urdfFileName, "processed");
    createReportFile(projectId, dhFileName, "processed");
    createReportFile(projectId, previewFileName, "preview");

    updateProjectStatus(projectId);
    Project.getEmailByProjectId(projectId, function (err, email){
      sendEmail(email[0].email, templates.calibrationResult(projectId), function(err, user){
        if(err){
          console.log(err);
          console.log(email[0].email)
        }
        return res.json({success: true})
      });
    })
  })
}


exports.startPythonService = function (projectId) {
  const FormData = require('form-data');
  const form = new FormData();
  File.getInputByProjectId(projectId, function (err, result){
    let file = `resources/files/${projectId}/input/${result[0].name}`
    form.append('file', fs.createReadStream(file));
    form.submit(config.PYTHON_SERVER_HOST + '/upload/' + projectId, function(err, result) {
      if(err){
        console.log(err)
      }
    });
  })
}

function createReportFile(projectId, fileName, type) {
  var file = {}
  file.name = fileName;
  file.uploaded_date = new Date();
  file.type = type;
  file.project_id = projectId;
  file.folder = "output"
  File.newFile(file, function (err, res) {
    if (err) {
      console.log(err);
    }
  });
}

function updateProjectStatus(projectId) {
  let project = {};
  project.status = "processed"
  Project.updateProjectById(projectId, project, function (err, result) {
    if (err) {
      console.log(err);
    }
  });
}



