const fs = require('fs/promises');

const getTalkers = async (fileName) => {
  const path = `/root/sd-020-a-project-talker-manager/${fileName}`;
  try {
    const content = await fs.readFile(path, { encoding: 'utf8' });
    return JSON.parse(content);
  } catch (error) {
    return { message: 'Erro ao acessar o banco de dados' };
  }
};

module.exports = getTalkers;
