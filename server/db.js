const Pool = require("pg").Pool;
const pool = new Pool({
    user:"postgres",
    password:"pepeeselmejor",
    host:"localhost",
    port:5432,
    database:"myessen"
});

module.exports = pool;