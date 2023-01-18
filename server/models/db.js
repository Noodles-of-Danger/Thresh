const { Pool } = require('pg');
const URI = require('../../db_pass.env');

PG_URI= URI
// console.log('URI: ', process.env.PG_URI)

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
