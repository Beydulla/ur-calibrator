'use strict';
var Billing = require('../model/billingModel');
const UserModel = require('../model/userModel')
const billingoPartner = require('../billingo/billingoPartner')

exports.deleteAccount = function (req, res){
  const userId = req.user.id
  UserModel.removeUserById(userId, function (err, result){
    if(err){
      res.json({ error: true, message: 'Something went wrong. Cannot delete the account'})
    }{
      res.json({ success: true})
    }
  })
}

exports.getBillingByUserId = function (req, res) {
  var userId = req.params.userid;
  //handles null error 
  if (!userId) {
    res.json({
      error: true,
      message: 'No user id provided'
    });
  } else {
    Billing.getBillingByUserId(userId, function (err, result) {
      if (err)
        console.log(err);
      res.json({
        success: true,
        billing: result[0] || {}
      });
    })
  }
};

exports.insertBilling = function (req, res) {
  var newBilling = new Billing(req.body.data);
  newBilling.user_id = req.user.id;
  if (!validateFields(newBilling)) {
    res.json({
      error: true,
      message: 'Please fill all fields'
    });
  }else {
    billingoPartner.createPartner(req.user.email, newBilling, function(billingoData, err) {
      if(err){
        console.log(err)
      }else{
        newBilling.billingo_id = billingoData.id;
        Billing.insertBilling(newBilling, function (err, billing) {
          if (err) {
            console.log(err);
          }else{
            res.json(billing);
          }
        });
      }
    })
  }

};

exports.updateBilling = function (req, res) {
  const newBilling = new Billing(req.body.data);
  if (validateFields(newBilling)) {
    billingoPartner.updatePartner(req.params.id, req.user.email, newBilling, function(billingoData, err){
      if(err){
        console.log(err)
      }else{
        Billing.updateBillingById(req.params.id, newBilling, function (err, billing) {
          if (err)
            res.send(err);
          res.json(billing);
        });
      }
    })
  } else {
    res.json({
      error: true,
      message: 'Please fill all fields'
    });
  }
};

function validateFields(newBilling) {
  if (!newBilling.company_name || !newBilling.street_address || !newBilling.state || !newBilling.city || !newBilling.postal_code || !newBilling.country || !newBilling.vat_id) {
    return false;
  }
  return true;
}
