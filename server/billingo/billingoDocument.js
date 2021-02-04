const config = require("../config")
const billingo = require('@codingsans/billingo-client');
const client = billingo.createBillingoClient({ apiKey: config.billngoSecret});
const dateFormat = require('dateformat');

exports.listDocuments = function(req, res){
    client.documents.list().then(function (result){
        console.log(result)
        res.json(result)
    })
}

exports.createDocument = function (partnerId,  res){
    const data = {
        "partner_id": partnerId,
        "block_id": 0,
        "block_id": 0,
        "bank_account_id": 0,
        "type": billingo.DocumentInsertType.INVOICE,
        "fulfillment_date": dateFormat(new Date(), "yyyy-mm-dd"),
        "due_date":  dateFormat(new Date(), "yyyy-mm-dd"),
        "payment_method": billingo.PaymentMethod.BARION,
        "language": billingo.DocumentLanguage.EN,
        "currency": billingo.Currency.HUF,
        "conversion_rate": 1,
        "electronic": false,
        "paid": true,
        "items": [
            {
                "name": "Robot Calibration",
                "unit_price": 100000,
                "unit_price_type": billingo.UnitPriceType.GROSS,
                "quantity": 1,
                "unit": "unit",
                "vat": "0%",
                "comment": "comment"
            }
        ],
        "comment": "comment",
        "settings": {
            "mediated_service": false,
            "without_financial_fulfillment": false,
            "online_payment": billingo.OnlinePayment.BARION,
            "round": billingo.Round.ONE,
            "place_id": 0
        }
    }
    client.documents.create(data).then(function (result){
        res(result, null)
    }).catch(function (err){
        console.log(err.response.data)
        res(null, err)
    })
}

exports.sendDocument = function (id, email, res){
    client.documents.send(id, {"emails" : [email]}).then(function(result){})
}

exports.downloadUrl = function (req, res){
    const id = req.params.id
    client.documents.publicUrl(id).then(function (data){
        res.json({
            success: true,
            downloadUrl: data.public_url
        })
    }).catch(function (err){
        console.log(err)
        res.json({
            success: false,
            downloadUrl: 'Something went wrong!'
        })
    })
}
