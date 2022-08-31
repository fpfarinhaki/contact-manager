const createExpressApp = require('./create-express-app');
const MongoClient = require('mongodb').MongoClient;

require('dotenv').config();

let database;

MongoClient.connect(process.env.DB_CONN, (err, db) => {
    console.log('connected to mongodb...');

    createExpressApp(db)
    .listen(3000, () => {
        database = db;
        console.log('listening on port 3000...');
    });

});


