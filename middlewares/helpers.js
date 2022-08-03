const crypto = require('crypto');

function generateToken() {
  return crypto.randomBytes(8).toString('hex');
}

function checarData(data) {
  const dateRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
  return dateRegex.test(data);
}

module.exports = {
  generateToken,
  checarData,
};
