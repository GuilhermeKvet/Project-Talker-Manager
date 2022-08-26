const path = 'src/talker.json';
const fs = require('fs').promises;
// const { join } = require('path');

const readFile = async () => {
  try {
    // const completePath = join(__dirname, path);
    const contentFile = await fs.readFile(path, 'utf-8');
    return JSON.parse(contentFile);
  } catch (error) {
    console.error(error);
    return error;
  }
};

module.exports = {
  readFile,
};