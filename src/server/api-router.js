const express = require('express');
const jwtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { expressjwt: jwt } = require("express-jwt");

function apiRouter(database) {
    const router = express.Router();

    router.use(jwt(
        { 
            secret: process.env.JWT_SECRET,
            algorithms: ["HS256"] 
        }).unless({ path: '/api/authenticate'})
    );

    router.use((err, req, res, next) => {
        if(err.name === "UnauthorizedError") {
            res.status(401).send({ error: err.message });   
        }
    });
    
    router.get('/contacts', (req, res) => {
        const contactsCollection = database.db('contact-manager').collection('contacts');
    
        contactsCollection.find({}).toArray((err, contacts) => {
            return res.json(contacts);
        });
    });
    
    router.post('/contacts', (req, res) => {
        console.log(req.body);
        const user = req.body;
    
        const contactsCollection = database.db('contact-manager').collection('contacts');
    
        contactsCollection.insertOne(user, (err, result) => {
            if(err) {
                return res.status(500).json({error: "Error inserting new contact."});
            } 
            
            return res.status(201).json(result);
        });
    });

    router.post('/authenticate', (req, res) => {
        const user = req.body;

        const usersCollection  = database.db('contact-manager').collection('users');

        usersCollection.findOne({ username: user.username}, (err, result) => {
            if(!result) res.status(404).json({error: "user not found."});

            if(!bcrypt.compareSync(user.password, result.password)) {
                return res.status(401).json({error: 'incorrect password'});
            } 

            const payload = {
                username: result.username,
                admin: result.admin
            };

            const token = jwtoken.sign(payload, process.env.JWT_SECRET, {expiresIn: '4h'});

            return res.json({
                message: 'successfully authenticated',
                token: token
            });
        });
    });

    return router;
}

module.exports = apiRouter;