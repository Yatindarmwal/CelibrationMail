'use strict';

const express = require('express');
const router = express.Router();
const api_functions = require('../services/api_functions');

router.get('/api', function (req, res) {
    res.status(200).send('celibration mail api');
});

router.post('/api/register_user', async function (req, res) {
    let user = {
        name: req.query.name,
        email: req.query.email,
        timezone: req.query.timezone,
        password: req.query.password
    }
    try {
        let user_added = await api_functions.addUser(user);
    } catch (error) {
        console.log('error' + error);
        res.status(400).send('Failed' + error);
        return;
    }
    res.status(200).send('Congrats Account created please login');
});



module.exports = router