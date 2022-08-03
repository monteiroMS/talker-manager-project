const express = require('express');
const fs = require('fs/promises');
const tokenValidator = require('../middlewares/tokenValidator');
const nameValidator = require('../middlewares/nameValidator');
const talkValidators = require('../middlewares/talkValidator');
const ageValidator = require('../middlewares/ageValidator');

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const data = JSON.parse(await fs.readFile('talker.json', { encoding: 'utf8' }));
    return res.status(200).json(data);
  } catch (error) {
    return res.status(200).json([]);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const data = JSON.parse(await fs.readFile('talker.json', { encoding: 'utf8' }));
  const talker = data.find(({ id: managerId }) => Number(id) === managerId);

  if (!talker) {
    return res.status(404).json({
      message: 'Pessoa palestrante não encontrada',
    });
  }

  return res.status(200).json(talker);
});

const newTalkerValidators = [
  tokenValidator,
  nameValidator,
  ageValidator,
  ...talkValidators,
];

router.post('/', newTalkerValidators, async (req, res) => {
  const data = JSON.parse(await fs.readFile('talker.json', { encoding: 'utf8' }));

  const newTalker = req.body;

  newTalker.id = data.length + 1;

  data.push(newTalker);

  try {
    await fs.writeFile('talker.json', JSON.stringify(data));
  } catch (err) {
    return res.status(500).json({
      message: 'Ocorreu um erro interno no servidor',
    });
  }

  return res.status(201).json(newTalker);
});

module.exports = router;
