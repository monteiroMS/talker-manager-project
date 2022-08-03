const express = require('express');
const fs = require('fs/promises');

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const content = JSON.parse(await fs.readFile('talker.json', { encoding: 'utf8' }));
    return res.status(200).json(content);
  } catch (error) {
    return res.status(200).json([]);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const content = JSON.parse(await fs.readFile('talker.json', { encoding: 'utf8' }));
  const talker = content.find(({ id: managerId }) => Number(id) === managerId);

  if (!talker) {
    return res.status(404).json({
      message: 'Pessoa palestrante não encontrada',
    });
  }
  
  return res.status(200).json(talker);
});

module.exports = router;
