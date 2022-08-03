const passwordValidator = (req, res, next) => {
  const { password } = req.body;
  const MIN_LENGTH = 6;

  if (!password) {
    return res.status(400).json({
      message: 'O campo "password" é obrigatório',
    });
  }

  if (password.length < MIN_LENGTH) {
    return res.status(400).json({
      message: 'O "password" deve ter pelo menos 6 caracteres',
    });
  }

  next();
};

module.exports = passwordValidator;