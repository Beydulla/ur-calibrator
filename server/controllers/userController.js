'use strict';
var User = require('../model/userModel.js');
var Project = require('../model/projectModel');
const sendEmail = require('../email/emailSend')
const msgs = require('../email/emailMsgs')
const templates = require('../email/emailTemplate')
const crypto = require("crypto")
const bcrypt = require('bcrypt')
const utils = require("../helpers/utils")



exports.create_user = function(req, res) {
  var new_user = new User(req.body);
  //handles null error 
   if(!new_user.email || !new_user.password){
            res.status(401).send({ error:true, message: 'Please fill all fields' });
    }
    else{
      
      User.findUserByEmail(new_user.email, function(err, user){
        if(err)
          console.log(err);
        if(user.length != 0){
          res.status(401).send({error:true, message: 'Email address already exists. Please use different email address or return to login page!'})
        }
        else{
          new_user.email_confirmed = 0;
          new_user.confirmation_key = crypto.randomBytes(32).toString("hex");
          bcrypt.hash(new_user.password, 10, function(err, hash) {
            if(err)
              console.log(err);
            new_user.password = hash;
            User.createUser(new_user, function(err, user) {   
              if (err)
                  res.send(err);
              sendEmail(new_user.email, templates.confirm(new_user.confirmation_key), function(err, user){
              if(err){
                console.log(err);
              }
            });
             res.json(user);
            });
          });
          
        }
      })
      
      
    }
}; 


exports.confirmEmail = (req, res) => {
  let key = req.params.key;

  User.findUserByKey(key, function(err, user){

    if (!user[0]) {
        res.json({ message: msgs.couldNotFind })
      }
      else if (user[0] && !user[0].email_confirmed) 
      {
        User.updateUserById(user[0].id, { email_confirmed: 1 }, function(err){

          if(err){
            console.log(err);
            res.json({message: err});
          }
          else{
            res.json({message:msgs.confirmed});
          }
        })
      }
      else  {
        res.json({ message: msgs.alreadyConfirmed })
      }
  });
}

exports.list_all_users = function(req, res) {
  User.getAllUsers(function(err, user) {

    console.log('controller')
    if (err)
      res.send(err);
      res.send(user);
  });
};

exports.authenticate_user = function(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  //handles null error 
   if(!email || !password){
            res.json({ error:true, message: 'Please fill all fields' });
    } 
    else{
      
      User.findUserByEmail(email, function(err, user){
        if(err)
          console.log(err);
        if(user.length == 0){
          res.json({error:true, message: "Email address or Password is not correct!"})
        }
        else if(user[0].email_confirmed == 0){
              res.json({error:true, message: "You must confirm your email to login"})
        }else{
            bcrypt.compare(password, user[0].password, function(err, result) {
            if(result) {
              Project.getProjectsByUserId(user[0].id, function(err, projects){
                if(err)
                  console.log(err);
                let token = utils.generateToken(user[0]);
                res.json({
                  success: true,
                  message: 'Authentication successful!',
                  token: token,
                  projects: projects
                });
              });
            } else {
              res.json({error:true, message: "Email address or Password is not correct!"})
            } 
          });
          
        }
      })
    }
};

exports.get_User = function(req, res) {
  User.getUserById(req.params.id, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};


exports.update_user = function(req, res) {
  User.updateUserById(req.params.id, new User(req.body), function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};


exports.delete_user = function(req, res) {
  User.removeUserById( req.params.id, function(err, user) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};


exports.deleteExpiredUsers = function(req, res) {
  User.getExpiredUsers(function(err, users){
    if (err)
      res.send(err);
      users.forEach(function(expiredUser) {

        User.removeUserById(expiredUser.id, function(err, res){
          if(err){
            console.log(err);
          }
          else{
            console.log("deleted:" + expiredUser.email);
            sendEmail(expiredUser.email, templates.expired(), function(err, user){
              if(err){
                console.log(err);
              }
            });
          }
        });
      })
  });
};

exports.resetPassword = function(req, res) {
  const requestedUser = req.user;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword
  if(!oldPassword || !newPassword){
    res.json({ error:true, message: 'Please fill all fields' });
  }
  else{
    User.findUserByEmail(requestedUser.email, function(err, user){
      if(err)
        console.log(err);
      if(user.length == 0){
        res.json({error:true, message: "Email address or Password is not correct!"})
      }
      else{
        bcrypt.compare(oldPassword, user[0].password, function(err, result) {
          if(result) {
            bcrypt.hash(newPassword, 10, function(err, hashedPassword) {
              if(err)
                console.log(err);
              User.updateUserById(requestedUser.id, {password:hashedPassword}, function(err) {
                if (err)
                  res.send(err);
                sendEmail(requestedUser.email, templates.passwordReset(), function(err){
                  if(err){
                    console.log(err);
                  }
                });
                return res.json({
                  success: true,
                  message: 'Your password has been updated successfully!'
                })
              });
            });
          } else {
            res.json({error:true, message: "Old password is not correct!"})
          }
        });

      }
    })
  }
};

exports.forgotPassword = function(req, res) {
  const email = req.body.email;
  if(!email){
    res.json({ error:true, message: 'Please fill email address!' });
  }
  else{
    User.findUserByEmail(email, function(err, user){
      if(err)
        console.log(err);
      if(user.length == 0){
        res.json({error:true, message: "Email address doesn't exist! Please, go to register page, instead!"})
      }
      else{
        const resetKey = crypto.randomBytes(32).toString("hex");
        const keyDate = new Date();
        User.updateResetKey(resetKey, keyDate, email, function (error){
          if(error){
            console.log(error);
            res.json({error:true, message: "Something went wrong. Please try again later!"})
          }else{
            sendEmail(email, templates.forgotPassword(resetKey));
            res.json({success:true, message: "The link for resetting password has been sent to your email address. It will be expired in 30 minutes"})
          }
        })
      }
    })
  }
};

exports.resetForgottenPassword = function (req, res){
  const resetKey = req.body.resetKey;
  const password = req.body.password;
  User.getUserByResetKey(resetKey, function (err, user){
    if(err){
      res.json({error:true, message: "Something went wrong. Please try again later!"})
    }else{
      if(user.length == 0){
        res.json({error:true, message: "Reset key is not valid!"})
      }else{
        bcrypt.hash(password, 10, function(err, hashedPassword) {
          User.updateUserById(user[0].id, {password: hashedPassword}, function (err) {
            if (err){
              console.log(err)
              res.json({error:true, message: "Something went wrong. Please try again later!"})
            }else{
              sendEmail(user[0].email, templates.passwordReset(), function (err) {
                if (err) {
                  console.log(err);
                }
              });
              return res.json({
                success: true,
                message: 'You password has been updated successfully!'
              })
            }
          });
        });
      }
    }
  })

}
