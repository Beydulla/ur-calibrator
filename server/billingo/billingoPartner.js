const config = require("../config");
const billingo = require('@codingsans/billingo-client');
const client = billingo.createBillingoClient({ apiKey: config.billngoSecret});



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

