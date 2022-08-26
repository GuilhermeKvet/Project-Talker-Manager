const express = require('express');
const talkerFunctions = require('../files/talkerFunctions');
// const allTalkers = require('../talker.json');

const router = express.Router();

router.get('/', async (req, res) => {
  const talkers = await talkerFunctions.readFile();
  if (talkers.length > 0) {
    return res.status(200).json(talkers);
  }
  return res.status(200).json([]);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await talkerFunctions.getTalkerById(Number(id));
  if (talker) {
    return res.status(200).json(talker);
  }
  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

module.exports = router;