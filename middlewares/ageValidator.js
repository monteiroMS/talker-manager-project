const MIN_AGE = 18;

const ageValidator = (req, res, next) => {
  const { age } = req.body;
  if (!age) {
    return res.status(400).json({
      message: 'O campo "age" é obrigatório',
    });
  }
  if (typeof age !== 'number') {
    return res.status(400).json({
      message: 'O campo "age" deve conter apenas números',
    });
  }
  if (age < MIN_AGE) {
    return res
      .status(400)
      .json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

module.exports = ageValidator;
