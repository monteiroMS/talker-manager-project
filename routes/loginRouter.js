const express = require('express');
const { generateToken } = require('../middlewares/helpers');
const emailValidator = require('../middlewares/emailValidator');
const passwordValidator = require('../middlewares/passwordValidator');

const router = express.Router();

const validators = [
  emailValidator,
  passwordValidator,
];

router.post('/', validators, (_req, res) => {
  const token = generateToken();
  return res.status(200).json({ token });
});

module.exports = router;
