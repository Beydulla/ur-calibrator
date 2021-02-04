const billingo = require('@codingsans/billingo-client');

const client = billingo.createBillingoClient({
    apiKey: '5610e1f2-1239-11eb-90ef-065a61000a6e',
});

exports.listDocuments = function(req, res){
    client.documents.list().then(function (result){
        console.log(result)
        res.json(result)
    })
}

exports.createDocument = function (req, res){
    const data = {
        "vendor_id": "string",
        "partner_id": 1730459884,
        "block_id": 0,
        "bank_account_id": 0,
        "type": billingo.DocumentInsertType.INVOICE,
        "fulfillment_date":new Date().toDateString(),
        "due_date": new Date().toDateString(),
        "payment_method": billingo.PaymentMethod.BARION,
        "language": billingo.DocumentLanguage.EN,
        "currency": billingo.Currency.HUF,
        "conversion_rate": 1,
        "electronic": false,
        "paid": true,
        "items": [
            {
                "product_id": 1,
                "quantity": 1
            },
            {
                "name": "string",
                "unit_price": 0,
                "unit_price_type": billingo.UnitPriceType.GROSS,
                "quantity": 0,
                "unit": "string",
                "vat": "0%",
                "comment": "string"
            }
        ],
        "comment": "string",
        "settings": {
            "mediated_service": false,
            "without_financial_fulfillment": false,
            "online_payment": billingo.OnlinePayment.BARION,
            "round": billingo.Round.ONE,
            "place_id": 0
        }
    }
    client.documents.create(data).then(function (result){
        res.json(result);
        console.log(result);
    }).catch(function (err){
        console.log("beydu1")
        console.log(err.response.data)
    })
}

exports.listDocuments = function (req, res){
    client.documents.list().then(function (result){
        console.log(result)
        res.json(result)
    })
}

exports.createPartner = function(userEmail, billingData, res){
    let partner = {
        "name": billingData.company_name,
        "address": {
            "country_code": billingo.Country.HU,
            "post_code": billingData.postal_code,
            "city": billingData.city,
            "address": billingData.street_address
        },
        "emails": [
            userEmail
        ],
        "taxcode": "",
        "iban": "",
        "swift": "",
        "account_number": "",
        "phone": "",
        "general_ledger_number": ""
    }
    client.partners.create(partner).then(function (result) {
        res(result, null)
    }).catch(function (err){
        res(null, err)
    })

}

exports.updatePartner = function (id, userEmail, billingData, res){
    let partner = {
        "name": billingData.company_name,
        "address": {
            "country_code": billingo.Country.HU,
            "post_code": billingData.postal_code,
            "city": billingData.city,
            "address": billingData.street_address
        },
        "emails": [
            userEmail
        ],
        "taxcode": "",
        "iban": "",
        "swift": "",
        "account_number": "",
        "phone": "",
        "general_ledger_number": ""
    }
    client.partners.update(id, partner).then(function (result) {
        res(result, null)
    }).catch(function (err){
        res(null, err)
    })
}


exports.listPartners = function (req, res){
    client.partners.list().then(function (result){
       console.log(result);
       res.json(result)
    })
}

exports.listDocumentBlocks = function (req, res){
    client.documentBlocks.list().then(function (result){
        console.log(result)
        res.json(result);
    })


}