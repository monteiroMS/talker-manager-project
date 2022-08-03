const { checarData } = require('./helpers');

const talkValidator = (req, res, next) => {
  const { talk } = req.body;

  if (!talk) {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório',
    });
  }

  next();
};

const watchedAtValidator = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  
  if (!watchedAt) {
    return res.status(400).json({
      message: 'O campo "watchedAt" é obrigatório',
    });
  }

  if (!checarData(watchedAt)) {
    return res.status(400).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }

  next();
};

const rateValidator = (req, res, next) => {
  const { talk: { rate } } = req.body;

  if (!rate) {
    return res.status(400).json({
      message: 'O campo "rate" é obrigatório',
    });
  }

  if (typeof rate !== 'number' || rate < 1 || rate > 5) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }

  next();
};

module.exports = [
  talkValidator,
  watchedAtValidator,
  rateValidator,
];
