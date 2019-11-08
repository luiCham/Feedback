require('../models/Registration')
const path=require('path');
const express = require('express');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');

const router = express.Router();
const credentials = mongoose.model('Credentials');
const auth=require('http-auth');
const basic = auth.basic({
  file: path.join(__dirname, '../users.htpasswd'),
});

router.get('/', (req,res)=>{
  res.render('login', {title:"Login"});
});

router.post('/',
  [
    body('email')
        .isEmail()
        .withMessage('Please enter a name'),
    body('password')
        .isLength({ min: 8 })
        .withMessage('Please enter an email'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const registration = new credentials(req.body);
      credentials.findOne(req.body, function(err, isMatch) {
        if(isMatch==null) {
          console.log('Wrong login: ');
          console.log(req.body);
          res.render('login', {
            title: 'login-error',
            error: 'Wrong email or password',
            data: req.body,
          });
        } else {
          console.log('ISMATCH IS: ' + isMatch)
          res.send('logged in!');
        }
      })
    } else {
        res.render('login', {
        title: 'login-error',
        errors: errors.array(),
        data: req.body,
      });
    }
  }
);

router.get('/register', (req, res) => {
  res.render('register', { title: 'registration' });
});

router.post('/register', 
[
  body('email')
    .isEmail()
    .withMessage('missing valid email'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('missing a valid password (min 8 characters)'),
  body('name')
    .isLength({ min: 1})
    .withMessage('missing name'),
  body('age')
    .isLength({ min: 1 })
    .withMessage('missing age'),
  body('cardNumber')
    .isLength({ min: 1 })
    .withMessage('missing card number'),
  body('cardPassword')
    .isLength({ min: 1 })
    .withMessage('missing card password'),
  body('cardExp')
    .isLength({ min: 1 })
    .withMessage('missing card expiration'),
  body('cardSecNumber')
    .isLength({ min: 1 })
    .withMessage('missing card security number')
],
(req, res) =>{
  const errors = validationResult(req);
    if(errors.isEmpty()){
      var registration=new credentials(req.body);
      registration.save()
        .then(()=>{
          console.log('Registered successfully!');
          res.redirect('/');
        })
        .catch(()=>{
          console.log('Registration failed - database error');
          res.redirect('/registration');
        });
    }else{
      res.render('register', {title:'Register-error', errors:errors.array(), data: req.body});
    }
  }
);

module.exports=router;