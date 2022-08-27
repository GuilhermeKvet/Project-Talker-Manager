const express = require('express');
const crypto = require('crypto');
const validateLogin = require('../middleware/validateLogin');
const { setToken } = require('../files/functions');

const router = express.Router();

const getToken = () => crypto.randomBytes(8).toString('hex');

router.post('/', validateLogin, async (req, res) => {
  const randomToken = getToken();
  await setToken(randomToken);
  return res.status(200).json({ token: randomToken });
});

module.exports = router;