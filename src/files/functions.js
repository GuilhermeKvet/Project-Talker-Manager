const path = 'src/talker.json';
const tokenPath = 'src/token.json';
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

const setToken = async (token) => {
  try {
    const array = [token];
    await fs.writeFile(tokenPath, JSON.stringify(array));
} catch (error) {
    console.error('Erro ao abrir o arquivo', error.message);
    return error;
}
};

const getToken = async () => {
  try {
    const token = await fs.readFile(tokenPath, 'utf-8');
     return JSON.parse(token);
  } catch (error) {
    console.log(error);
    return error;
  }
};

const insertTalk = async (talkers) => {
  try {
    await fs.writeFile(path, JSON.stringify(talkers));
  } catch (error) {
    console.error('Erro ao abrir o arquivo', error.message);
    return error;
  }
};

const updateTalk = async (id, update) => {
  try {
    const talkers = await readFile();
    const newTalker = talkers.find((talker) => talker.id === id);
    if (newTalker) {
      const newTalkers = talkers.map((talker) => {
        if (talker.id === id) return { ...talker, ...update };
        return talker;
      });
    await insertTalk(newTalkers);
    return { ...newTalker, ...update };
    }
  } catch (error) {
    console.error('Erro ao abrir o arquivo', error.message);
    return error;
  }
};

const deleteTalk = async (id) => {
  try {
    const talkers = await readFile();
    const talkerDelete = talkers.find((talker) => talker.id === id);
    if (talkerDelete) {
      const index = talkers.indexOf(talkerDelete);
      talkers.splice(index, 1);
      await insertTalk(talkers);
    }
  } catch (error) {
    console.error('Erro ao abrir o arquivo', error.message);
    return error;
  }
};

module.exports = {
  readFile,
  getTalkerById,
  getToken,
  setToken,
  insertTalk,
  updateTalk,
  deleteTalk,
};