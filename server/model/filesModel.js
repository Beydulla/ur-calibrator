'user strict';
var sql = require('./db.js');

//Task object constructor
var File = function(file){
    this.name = file.name;
    this.type = file.type;
    this.uploaded_date = file.uploaded_date;
    this.project_id = file.project_id;
};


File.newFile = function newFile(newFile, result) {    
    sql.query("INSERT INTO files set ?", newFile, function (err, res) {
            
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

File.getByProjectId = function getByProjectId(project_id, result) {    
    sql.query("Select * from files where project_id = ? ", project_id, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
      
        }
    });       
};

File.getInputByProjectId = function getByProjectId(project_id, result) {
    sql.query("Select * from files where project_id = ? order by id desc limit 1", project_id, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);

        }
    });
};

File.getById = function getById(id, result) {
    const query = `SELECT f.id, f.name, f.type, f.folder, f.project_id, py.status  FROM files f
                    left JOIN projects pr on f.project_id = pr.id
                    left JOIN payments py on f.project_id = py.project_id
                    WHERE f.id = ?
                    ORDER BY py.updated_date DESC LIMIT 1`    
    sql.query(query, id, function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res[0]);
      
        }
    });       
};

module.exports = File;