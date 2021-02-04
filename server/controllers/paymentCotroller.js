const config = require("../config")
const utils = require("../helpers/utils")
const Payment = require('../model/paymentModel');
const Project = require("../model/projectModel")
var BillingModel = require('../model/billingModel');
const Barion = require('node-barion');
const billingoDocument = require('../billingo/billingoDocument')


let barion = new Barion({
    POSKey: config.payment.posKey,
    Environment: 'test'
});

let orderPayment = {};


initOrder = (projectId, redirectUrl, res) => {
    Project.getProjectsById(projectId, function (err, result) {
        if (err) {
            res(err, null)
        } else {
            let project = result[0];
            orderPayment = utils.generatePaymentTransaction(project, redirectUrl);
            res(null, orderPayment)
        }
    })
}


exports.startPayment = function (req, res) {
    const projectId = req.params.projectId;
    const redirectUrl = req.query.redirectUrl;
    const userId = req.user.id;
    BillingModel.getBillingByUserId(userId, function (err, billingData){
        if(err || billingData.length == 0){
            console.log(err)
            return res.json({error: true, message: "Please update billing data to start payment"});
        }else{
            initOrder(projectId, redirectUrl, function () {
                barion.startPayment(orderPayment, function (err, barionData) {
                    if (err) {
                        console.log(err);
                        return res.json({error: true, message: "Something went wrong! Please try again"});
                    }
                    let paymentData = {};
                    paymentData.payment_id = barionData.PaymentId;
                    paymentData.status = barionData.Status;
                    paymentData.project_id = projectId;
                    paymentData.user_id = req.user.id;
                    Payment.newPayment(paymentData, function (err, result) {
                        if (err) {
                            console.log(err);
                            return res.json({error: true, message: "Something went wrong! Please try again"});
                        }
                        Payment.getProjetcIdByPaymentId(paymentData.payment_id, function (err, projectId){
                            Project.updateProjectById(projectId, {'payment_status' : barionData.Status}, function (err, res){
                                console.log(err)
                            })
                        })
                        res.json({
                            success: true,
                            gatewayUrl: barionData.GatewayUrl
                        });
                    })
                });
            })
        }
    })

}

exports.handleCallBack = function(req, res){
    let paymentId = req.query.paymentId;
    barion.getPaymentState({ PaymentId: paymentId }, function (err, barionData) {
        if(err){
            console.log(err)
        }else{
            let paymentData = {};
            paymentData.status = barionData.Status;
            paymentData.amount = barionData.Total;
            paymentData.currency = barionData.Currency;
            paymentData.updated_date = new Date();
            BillingModel.getBillingoIdbyPaymentId(paymentId, function (err, partnerId){
                if(err){
                    console.log(err)
                }else{
                    billingoDocument.createDocument(partnerId, function (billingoResult){
                        paymentData.billingo_id = billingoResult.id;
                        billingoDocument.sendDocument(billingoResult.id, barionData.Transactions[0].Payer.Email)
                        Payment.updatePaymentByPaymentId(paymentId, paymentData, function(err, result){
                            if(err){
                                console.log(err)
                            }else{
                                Payment.getProjetcIdByPaymentId(paymentId, function (err, projectId){
                                    Project.updateProjectById(projectId, {'payment_status' : barionData.Status}, function (err, res){
                                        console.log(err)
                                    })
                                })
                                res.status(200).send("Success!");
                            }
                        })
                    })
                }
            })

        }
    });
}

exports.getBillingHistoryByUserId = function(req, res){
    const userId = req.user.id;
    console.log(userId)
    Payment.getPaymentsByUserId(userId, function(err, result){
        if(err){
            console.log(err);
            return res.json({ error: true, message: "Something went wrong! Failed to load Billing history!" });
        }
        return res.json({billingHistory: result})
    })

}