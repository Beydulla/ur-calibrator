'user strict';
var sql = require('./db.js');

//Task object constructor
var Billing = function (billing) {
    this.company_name = billing.company_name;
    this.street_address = billing.street_address;
    this.state = billing.state;
    this.city = billing.city;
    this.postal_code = billing.postal_code;
    this.country = billing.country;
    this.vat_id = billing.vat_id;
    this.user_id = billing.user_id;
};

Billing.insertTest = function insertTest(blob, result) {
    sql.query("INSERT INTO test set test =?", blob, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res.insertId);
        }
    });
};

Billing.getTestBlob = function getTestBlobId(result) {
    sql.query("Select * from test where id = 2 ", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);

        }
    });
};

Billing.insertBilling = function createBilling(newBilling, result) {
    sql.query("INSERT INTO billing set ?", newBilling, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res.insertId);
        }
    });
};

Billing.getBillingByUserId = function getBillingByUserId(userId, result) {
    sql.query("Select * from billing where user_id = ? ", userId, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);

        }
    });
};

Billing.removeBillingById = function (id, result) {
    sql.query("DELETE FROM billing WHERE id = ?", [id], function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};

Billing.updateBillingById = function (id, billing, result) {
    sql.query("UPDATE billing SET ? WHERE billingo_id = ?", [billing, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};

Billing.getBillingoIdbyPaymentId = function (paymentId, result){
    sql.query("SELECT b.billingo_id FROM billing b left join payments p on p.user_id = b.user_id where payment_id = ?", paymentId, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
          result(null, res[0].billingo_id)
        }
    });
}

module.exports = Billing;