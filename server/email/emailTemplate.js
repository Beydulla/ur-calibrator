var config = require("../config");

module.exports = {

  confirm: (key) => ({
    subject: 'UR- Calibrator Confirmation Email',
    html: `
      <h4>Dear User,</br></h4>
      <a href='${config.ORIGIN}/confirm/${key}'>Click to confirm your email address </a>
      <p> The link will expire in 3 days!</a></p>

    `,      
    text: `Copy and paste this link: ${config.ORIGIN}/confirm/${key}`
  }),

  expired: () => ({
    subject: 'UR- Calibrator Expired User',
    html: `
      <h4>Dear User,</br></h4>
      <p> Your confirmation link has been expired and your account has been removed from <a href='${config.ORIGIN}'> the website</a></p>
    `,      
    text: `Your confirmation link has been expired and your account has been removed  from URCalibrator.com!`
  }),
  calibrationResult: (projectId) => ({
    subject: 'UR- Calibrator Calibration Result',
    html: `
      <h4>Dear User,</br></h4>
      <p> Your project has been processed!</p>
      <p> You can check the result from the <a href='${config.ORIGIN}/projects/${projectId}/processed'>Website</a></p>
    ` 
  }),

  passwordReset: () => ({
    subject: 'UR- Calibrator Password Update',
    html: `
      <h4>Dear User,</br></h4>
      <p> You password has been updated successfully!</p> `
  }),

  forgotPassword: (key) => ({
    subject: 'UR- Calibrator Password Reset Link',
    html: `
      <h4>Dear User,</br></h4>
      <p> Please use the following link for resetting password!</p> 
      <p>  <a href='${config.ORIGIN}/reset-password/${key}'> Click to reset password </a></p>    `
  })
  
}