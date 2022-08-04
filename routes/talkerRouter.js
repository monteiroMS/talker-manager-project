const express = require('express');
const fs = require('fs/promises');
const tokenValidator = require('../middlewares/tokenValidator');
const nameValidator = require('../middlewares/nameValidator');
const talkValidators = require('../middlewares/talkValidator');
const ageValidator = require('../middlewares/ageValidator');

const router = express.Router();

const getData = async () => JSON.parse(
  await fs.readFile('talker.json', { encoding: 'utf8' }),
);

router.get('/', async (_req, res) => {
  try {
    const data = await getData();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(200).json([]);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const data = await getData();
  const talker = data.find(({ id: managerId }) => Number(id) === managerId);

  if (!talker) {
    return res.status(404).json({
      message: 'Pessoa palestrante não encontrada',
    });
  }

  return res.status(200).json(talker);
});

const talkerValidators = [
  tokenValidator,
  nameValidator,
  ageValidator,
  ...talkValidators,
];

router.post('/', talkerValidators, async (req, res) => {
  const data = await getData();

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

router.put('/:id', talkerValidators, async (req, res) => {
  const { id: talkerId } = req.params;

  const update = req.body;
  update.id = Number(talkerId);

  try {
    const data = await getData();
    const index = data.findIndex(({ id }) => id === Number(talkerId));
    data[index] = update;
    await fs.writeFile('talker.json', JSON.stringify(data));
    return res.status(200).json(data[index]);
  } catch (error) {
    return res.status(500).json({
      message: 'Erro interno no servidor',
    });
  }
});

module.exports = router;
