'user strict';
var sql = require('./db.js');

//Task object constructor
var Project = function(project){
    this.name = project.name;
    this.created_date = project.created_date;
    this.result = project.result;
    this.payment_status = project.payment_status;
    this.status = project.status;
    this.robot_type = project.robot_type;
    this.user_id = project.user_id;
};

Project.updateProjectById = function(id, project, result){
    sql.query("UPDATE projects SET ? WHERE id = ?", [project, id], function (err, res) {
      if(err) {
                  console.log("error: ", err);
                  result(null, err);
               }
             else{  
                  result(null, res);
                  }
              }); 
  };

Project.newProject = function newProject(newProject, result) {    
    sql.query("INSERT INTO projects set ?", newProject, function (err, res) {
            
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                console.log(res.insertId);
                result(null, res.insertId);
            }
        });           
};

Project.getProjectsById = function getProjectsById(id, result) {
    let selectQuery = `SELECT p.id, p.name, p.robot_type, p.created_date, p.result, p.status, p.user_id, pay.status payment_status
                        FROM projects p
                        LEFT JOIN payments pay
                        ON p.id = pay.project_id where p.id = ?
                        order by pay.id desc`;
    sql.query(selectQuery , id, function (err, res) {             
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                result(null, res);
          
            }
        });   
};

Project.getProjectsByUserId = function getProjectsByUserId(userId, result) {
    sql.query("Select * from projects where user_id = ? ", userId, function (err, res) {
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                result(null, res);
          
            }
        });   
};

Project.removeProjectById = function(id, result){
    sql.query("DELETE FROM projects WHERE id = ?", [id], function (err, res) {

               if(err) {
                   console.log("error: ", err);
                   result(null, err);
               }
               else{
                result(null, res);
               }
           }); 
};

Project.getEmailByProjectId = function(id, result){
    sql.query("SELECT email FROM projects, users where projects.user_id = users.id and projects.id = ?", [id], function (err, res) {

        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    });
};


module.exports = Project;