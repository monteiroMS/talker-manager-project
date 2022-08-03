const express = require('express');
const getTalkers = require('../middlewares/helpers/getTalkers');

const router = express.Router();

router.get('/', async (_req, res) => {
    const content = await getTalkers('talker.json');
    return res
      .status(200)
      .json(content);
});

module.exports = router;
