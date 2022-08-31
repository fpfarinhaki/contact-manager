const express = require('express');
const path = require('path');
const apiRouter = require('./api-router');

function createExpressApp(database) {
    const app = express();
    
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }))
    app.use(express.static(path.join(__dirname, '/public')));
    app.use('/profiles', express.static(path.join(__dirname, 'profiles')));
    app.use('/api', apiRouter(database));

    app.use('*', (req, res) => {
        return res.sendFile(path.join(__dirname), 'public/index.html');
    });

    return app;
}

module.exports = createExpressApp;