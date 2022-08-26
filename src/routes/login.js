const express = require('express');

const router = express.Router();

const getToken = () => {
  let token = '';
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let index = 0; index < 16; index += 1) {
    token += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return token;
};

router.post('/', (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    const randomToken = getToken();
    return res.status(200).json({ token: randomToken });
  }
  return res.status(404).json({ message: 'Insira os valores de email e senha' });
});

module.exports = router;