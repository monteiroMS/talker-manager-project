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

// router.get('/:id', async (_req, res) => {

// });

module.exports = router;
