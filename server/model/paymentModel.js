'user strict';
var sql = require('./db.js');

var Payment ={}

Payment.updatePaymentByPaymentId = function(id, payment, result){
    sql.query("UPDATE payments SET ? WHERE payment_id = ?", [payment, id], function (err, res) {
      if(err) {
                  console.log("error: ", err);
                  result(null, err);
               }
             else{  
                  result(null, res);
                  }
              }); 
  };

Payment.newPayment = function newPayment(newPayment, result) {    
    sql.query("INSERT INTO payments set ?", newPayment, function (err, res) {
            
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

Payment.getPaymentsById = function getPaymentsById(id, result) {
    sql.query("Select * from payments where id = ? ", id, function (err, res) {             
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                result(null, res);
          
            }
        });   
};

Payment.getPaymentsByUserId = function getPaymentsByUserId(userId, result) {
    sql.query("Select * from payments where user_id = ? ", userId, function (err, res) {             
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                result(null, res);
          
            }
        });   
};

Payment.getProjetcIdByPaymentId = function getProjetcIdByPaymentId(id, result) {
    sql.query("Select project_id from payments where payment_id = ? ", id, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res[0].project_id);

        }
    });
};


module.exports = Payment;