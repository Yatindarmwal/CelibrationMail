'use strict';

const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    res.status(200).send('celibration mail home');
});

router.get('/register', (req, res) => {
    res.sendFile('/Users/yatindarmwal/Documents/Celibration_mail/public/register.html');
});

router.get('/login', (req, res) => {
    res.sendFile('/Users/yatindarmwal/Documents/Celibration_mail/public/login.html');
});

router.get('/dashboard', (req, res) => {
    res.sendFile('/Users/yatindarmwal/Documents/Celibration_mail/public/dashboard.html');
});


router.get('/neha', function (req, res) {
    res.status(200).send('neha is beautifull');
});


module.exports = router