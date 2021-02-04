var jwt = require('jsonwebtoken');
var config = require("../config");


exports.generateToken = function (user) {
    var u = {
        email: user.email,
        id: user.id.toString(),
        created_date: user.created_date
    };
    return token = jwt.sign(u, config.jwt.secret, {
        expiresIn: 60 * 60 * 24 // expires in 24 hours
    });
}

exports.generatePaymentTransaction = function (project, redirectUrl) {
    return orderPayment = {
        PaymentRequestId: 'PR-' + project.id,
        PaymentType: 'Immediate',
        Transactions: [
            {
                POSTransactionId: 'PT-' + project.id,
                Payee: config.payment.email,
                Total: config.payment.amount,
                Items: [
                    {
                        Name: 'UR Calibration',
                        Description: 'Robot type:' + project.robot_type,
                        Quantity: 1,
                        Unit: 'db',
                        UnitPrice: config.payment.amount,
                        ItemTotal: config.payment.amount
                    }
                ]
            }
        ],
        Currency: config.payment.currency,
        RedirectUrl: redirectUrl,
        CallbackUrl: config.ROOT + '/payment/barion/callback',
    };
}

exports.formatDate = function(date){
    return date.replace('T', ' ').substr(0, 19);
}