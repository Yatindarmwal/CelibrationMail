'use strict';

const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    res.status(200).send('celibration mail home');
});

router.get('/register', (req, res) => {
    res.sendFile('C:\Users\91875\Desktop\neww\CelibrationMail\public\register.html');
});

router.get('/login', (req, res) => {
    res.sendFile('C:\Users\91875\Desktop\neww\CelibrationMail\public\login.html');
});

router.get('/dashboard', (req, res) => {
    res.sendFile('C:\Users\91875\Desktop\neww\CelibrationMail\public\dashboard.html');
});


router.get('/neha', function (req, res) {
    res.status(200).send('neha is beautifull');
});


module.exports = router