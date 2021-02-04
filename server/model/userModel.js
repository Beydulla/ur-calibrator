'user strict';
var sql = require('./db.js');

var User = function(user){
    this.email = user.email;
    this.password = user.password;
    this.billing_address = user.billing_address;
    this.created_date = new Date();
    this.email_confirmed = user.email_confirmed;
    this.confirmation_key = user.confirmation_key;
};
User.createUser = function createUser(newUser, result) {    
        sql.query("INSERT INTO users set ?", newUser, function (err, res) {
                
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
User.findUserById = function createUser(userId, result) {
        sql.query("Select * from users where id = ? ", userId, function (err, res) {             
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res);
              
                }
            });   
};

User.findUserByKey = function findUserByKey(key, result) {
    sql.query("Select * from users where confirmation_key = ? ", [key], function (err, res) {             
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                result(null, res);
            }
        });   
};

User.findUserByEmail = function findUserByKey(email, result) {
    sql.query("Select * from users where email = ? ", [email], function (err, res) {             
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                result(null, res);
            }
        });   
};
User.getAllUsers = function getAllUsers(result) {
        sql.query("Select * from users", function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                  console.log('users : ', res);  

                 result(null, res);
                }
            });   
};
User.updateUserById = function(id, user, result){
  sql.query("UPDATE users SET ? WHERE id = ?", [user, id], function (err, res) {
    if(err) {
                console.log("error: ", err);
                result(null, err);
             }
           else{  
                result(null, res);
                }
            }); 
};
User.removeUserById = function(id, result){
     sql.query("DELETE FROM users WHERE id = ?", [id], function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                 result(null, res);
                }
            }); 
};

User.authenticateUser = function(email, password, result){
    sql.query("SELECT * FROM users WHERE email_confirmed = 1 and email = ? and password = ? ", [email, password], function (err, res) {
            if(err) {
                console.log("error: ", err);
                    result(err, null);
               }
             else {
                    result(null, res);
                  }
              }); 
  };
User.getExpiredUsers = function(result){
    sql.query("SELECT * FROM users WHERE DATE(DATE_ADD(users.created_date, INTERVAL 3 DAY)) < CURRENT_DATE AND users.email_confirmed = 0", function (err, res) {
        if(err) {
            console.log("error: ", err);
                result(err, null);
           }
         else {
                result(null, res);
              }
     }); 
}

User.updateResetKey = function(key, keyDate, email, result){
    sql.query("UPDATE users SET reset_key = ?, reset_key_date = ? WHERE email = ?", [key, keyDate, email], function (err) {
        if(err) {
            console.log("error: ", err);
            result(err);
        }
        else{
            result(null);
        }
    });
}

User.getUserByResetKey = function(key, result){
   // sql.query("SELECT * FROM users WHERE reset_key = ? and  DATE_ADD(users.reset_key_date, INTERVAL 0.5 HOUR) > now() ", [key], function (err, res) {
    sql.query("SELECT * FROM users WHERE reset_key = ?", [key], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
}
module.exports= User;