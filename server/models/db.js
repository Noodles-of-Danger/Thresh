const { Pool } = require('pg');
const db = require('../../db_pass.env');

PG_URI= db.URI;
PSW = db.PSW;

const pool = new Pool({
    connectionString: PG_URI,
    password: PSW,
    port: 3000
});


module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};
