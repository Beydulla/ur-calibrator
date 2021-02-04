const config = require("../config")
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;


const oauth2Client = new OAuth2(
  config.gmail.client_id,
  config.gmail.client_secret,
  "https://developers.google.com/oauthplayground"
)


oauth2Client.setCredentials({
  refresh_token: config.gmail.refresh_token
});
const accessToken = oauth2Client.getAccessToken()


const smtpTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: config.gmail.user_name,
    clientId: config.gmail.client_id,
    clientSecret: config.gmail.client_secret,
    refreshToken: config.gmail.refresh_token,
    accessToken: accessToken
  }
});

module.exports = function sendEmail(receiver, content, result) {
  const mailOptions = {
    from: config.gmail.user_name, 
    to: receiver,
    subject: content.subject,
    html: content.html,
    text: content.text
  }
  smtpTransport.sendMail(mailOptions, function (err) {
    if (err) {
      result(err)
    }else{
      result(null)
    }
  })
}
