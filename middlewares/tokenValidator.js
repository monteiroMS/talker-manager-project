const MIN_TOKEN_LENGTH = 16;

const tokenValidator = (req, res, next) => {
  const { authorization: token } = req.headers;

  if (!token) {
    return res.status(401).json({
      message: 'Token não encontrado',
    });
  }

  if (token.length < MIN_TOKEN_LENGTH) {
    return res
      .status(401)
      .json({ message: 'Token inválido' });
  }

  next();
};

module.exports = tokenValidator;
