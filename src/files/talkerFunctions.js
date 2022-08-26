const path = 'src/talker.json';
const fs = require('fs').promises;

const readFile = async () => {
  try {
    const contentFile = await fs.readFile(path, 'utf-8');
    return JSON.parse(contentFile);
  } catch (error) {
    console.error(error);
    return error;
  }
};

const getTalkerById = async (id) => {
  const talkers = await readFile();
  const response = talkers.filter((talker) => talker.id === id);
  return response[0];
};

module.exports = {
  readFile,
  getTalkerById,
};