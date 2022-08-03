const express = require('express');
const generateToken = require('../middlewares/helpers');

const router = express.Router();

router.post('/', (req, res) => {
  const token = generateToken();
  return res.status(200).json({ token });
});

module.exports = router;
