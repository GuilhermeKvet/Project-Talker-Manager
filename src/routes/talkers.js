const express = require('express');
const { readFile, getTalkerById, insertTalk, updateTalk } = require('../files/functions');
const validateToken = require('../middleware/validateToken');
const {
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
 } = require('../middleware/validateTalker');

const router = express.Router();

router.get('/', async (req, res) => {
  const talkers = await readFile();
  if (talkers.length > 0) {
    return res.status(200).json(talkers);
  }
  return res.status(200).json([]);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await getTalkerById(Number(id));
  if (talker) {
    return res.status(200).json(talker);
  }
  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

router.post('/',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  async (req, res) => {
  const newTalker = req.body;
  const talkers = await readFile();
  newTalker.id = Number(talkers[talkers.length - 1].id) + 1;
  await insertTalk([...talkers, newTalker]);
  return res.status(201).json(newTalker);
});

router.put('/:id',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  async (req, res) => {
    const { id } = req.params;
    const talker = req.body;
    const updateTalker = await updateTalk(Number(id), talker);
    return res.status(200).json(updateTalker);
  });

module.exports = router;