const knex = require('knex');

const db = knex({
    client: 'mysql2',
    connection: {
        host: 'localhost',
        user: 'root',
        password: 'Shruti1211@',
        database: 'college_db',
    },
});

module.exports = db;
