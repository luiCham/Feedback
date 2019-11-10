require('../models/Registration')
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');
const { unlink } = require('fs-extra');

const Image = require('../models/Image');

const router = express.Router();
const credentials = mongoose.model('Credentials');
const auth=require('http-auth');
const basic = auth.basic({
  file: path.join(__dirname, '../users.htpasswd'),
});

router.get('/', (req,res)=>{
  res.redirect('/login');
});

router.get('/login', (req,res)=>{
  res.render('login', {title:"Login"});
});

router.post('/login',
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
          res.redirect('/products');
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
          res.redirect('/productsfeedback');
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

router.get('/products', async (req,res) => {
  const images = await Image.find();
  console.log(images);
  res.render('index.ejs', { images });
});

router.post('/upload', async (req, res) => {
  const image = new Image();
  image.title = req.body.title;
  image.price = req.body.price;
  image.description = req.body.description;
  image.category = req.body.category;
  image.filename = req.file.filename;
  image.path = '/img/uploads/' + req.file.filename;
  image.originalname = req.file.originalname;
  image.mimetype = req.file.mimetype;
  image.size = req.file.size;

  await image.save();

  res.redirect('/products');
});

router.get('/upload', (req, res) => {
  res.render('upload.ejs');
});

router.get('/image/:id', async (req, res) => {
  const { id } = req.params;
  const image = await Image.findById(id);
  console.log(image);
  res.render('profile.ejs', { image });
});

router.get('/image/:id/delete', async (req, res) => {
  const { id } = req.params;
  const image = await Image.findByIdAndDelete(id);
  await unlink(path.resolve('./public/' + image.path));
  res.redirect('/products');
});

module.exports=router;