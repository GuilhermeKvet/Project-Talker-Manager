const { getToken } = require('../files/functions');

const validateToken = async (req, res, next) => {
  const { authorization } = req.headers;
  const token = await getToken();
  if (!authorization) {
    res.status(401).json({ message: 'Token não encontrado' });
  } else if (!token.includes(authorization)) {
    res.status(401).json({ message: 'Token inválido' });
  } else {
    next();
  }
};

module.exports = validateToken;