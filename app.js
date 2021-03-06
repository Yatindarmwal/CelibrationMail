'use strict';

const express = require('express');
const db = require('./services/database');
const celibration_mail_cron = require('./background_process/celibration_mail_cron');
const app = express();
var bodyParser = require('body-parser');
app.use('/', express.static(__dirname + '/public'));
app.use(bodyParser.json());
const port = 3001;
app.use(require('./routes/website_routes'));
app.use(require('./routes/api_routes'));
app.listen(port, () => console.log(`Celibration Mail app running on port ${port}!`));
