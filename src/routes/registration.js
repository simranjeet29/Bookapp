/* eslint-disable new-cap */
const router = require('express').Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const bodyparser = require('body-parser');
const { check, validationResult } = require('express-validator');
const User = require('../database/models/user');

router.use(bodyparser.urlencoded({ extended: true }));

const redirecthome = (request, response, next) => {
  if (request.session.userId) { response.redirect('/'); } else { next(); }
};

router.get('/registration', redirecthome, (request, response) => {
  const usersession = request.session;
  response.render('./../views/registration', { usersession });
});
router.get('/logout', (request, response) => {
  request.session.destroy();
  response.redirect('./');
});
router.get('/login', redirecthome, (request, response) => {
  const usersession = request.session;
  response.render('./../views/login', { usersession });
});

router.post('/registration', redirecthome, [check('useremail', 'invalid email address').isEmail(),
  check('userpassword', 'Password is Invalid').isLength({ min: 4 })], async (request, response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(422).json({ errors: errors.array() });
  }
  const hashcode = await bcrypt.hash(request.body.userpassword[0], 8);
  const user = await new User({
    _id: new mongoose.Types.ObjectId(),
    email: request.body.useremail,
    password: hashcode,
  });
  await user.save();
  response.redirect('/login');
});

router.post('/login', async (request, response) => {
  let valid;
  console.log(request.body);
  request.session.userId = undefined;
  const result = await User.find({ email: request.body.useremail });
  console.log(result);
  if (result.length < 1) {
    response.redirect('./login');
  } else {
    try {
      valid = await bcrypt.compare(request.body.userpassword, result[0].password);
    } catch (err) {
      console.log('invalid');
      response.redirect('/login');
    }
    if (valid) {
      console.log(valid);
      request.session.userId = result[0]._id;
      response.redirect('/');
    }
  }
});

module.exports = router;
