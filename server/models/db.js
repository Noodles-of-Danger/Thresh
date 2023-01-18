const { Pool } = require('pg');

PG_URI= 'postgres://adsdxmbz:rN2SbZhEGvuMk563xOCWmZ5gFbHNL6UC@queenie.db.elephantsql.com/adsdxmbz'
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
