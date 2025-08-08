const fs = require('fs').promises;
const path = require('path');


const DATA_PATH = path.join(__dirname, '../../../data/items.json');


async function readData() { //chisom maxwell: making this a function with promise value
     try {
          const raw = await fs.readFile(DATA_PATH, 'utf8');
          return JSON.parse(raw);
     }
     catch (e) {
          console.error(`Error: reading file `, e)
          return [];
     }

}

async function writeData(data) {
     try {
          await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2))
          return true;
     }
     catch (e) {
          console.error(`Error: writing file `, e)
          return false;
     }
}

module.exports = { writeData, readData, DATA_PATH }