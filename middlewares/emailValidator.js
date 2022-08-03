const emailValidator = (req, res, next) => {
  const { email } = req.body;
  const regexTest = /\S+@\S+.\S+\S+./;

  if (!email) {
    return res.status(400).json({
      message: 'O campo "email" é obrigatório',
    });
  }

  if (!regexTest.test(email)) {
    return res
      .status(400)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
};

module.exports = emailValidator;
