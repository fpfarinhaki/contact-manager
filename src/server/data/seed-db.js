require('dotenv').config();

const users = require('./users');
const contacts = require('./contacts');

const { MongoClient, ServerApiVersion } = require('mongodb');
const bcrypt = require('bcrypt');

const client = new MongoClient(process.env.DB_CONN, 
    { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function seedCollection(collectionName, initialRecords) {
    try {
        console.log('connected to mongodb...');

        const collection = client.db('contact-manager').collection(collectionName);
        
        await collection.drop();

        initialRecords.forEach((record) => {
            if (record.password) {
                record.password = bcrypt.hashSync(record.password, 10);
            }
        });

        const result = await collection.insertMany(initialRecords);
        console.log(`${result.insertedCount} records inserted.`);
    } finally {
        console.log(`closing connection...`);
        await client.close();
        console.log('done.');
    }
}

seedCollection('users', users);
seedCollection('contacts', contacts);