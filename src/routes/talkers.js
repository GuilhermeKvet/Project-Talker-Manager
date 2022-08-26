const express = require('express');
const { readFile } = require('../files/talkerFunctions');
// const allTalkers = require('../talker.json');

const router = express.Router();

router.get('/', async (req, res) => {
  const talkers = await readFile();
  if (talkers.length > 0) {
    return res.status(200).json(talkers);
  }
  return res.status(200).json([]);
});

module.exports = router;