const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

// you would have to import / invoke this in another file
module.exports = {
  async  openDb () {
    return open({
      filename: './sas.db',
      driver: sqlite3.Database
    })
  }
}
