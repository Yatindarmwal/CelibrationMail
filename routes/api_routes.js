'use strict';

const express = require('express');
const router = express.Router();

router.get('/api', function (req, res) {
    res.status(200).send('celibration mail api');
});


module.exports = router