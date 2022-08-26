const express = require('express');
const crypto = require('crypto');
const validateLogin = require('../middleware/validateLogin');

const router = express.Router();

const getToken = () => crypto.randomBytes(8).toString('hex');

router.post('/', validateLogin, (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    const randomToken = getToken();
    return res.status(200).json({ token: randomToken });
  }
  return res.status(400).json({ message: 'Insira os valores de email e senha' });
});

module.exports = router;