'use strict';

const express = require('express');
const celibration_mail_cron = require('./background_process/celibration_mail_cron');
const app = express();
const port = 3001;
app.use(require('./routes/website_routes'));
app.use(require('./routes/api_routes'));
app.listen(port, () => console.log(`Celibration Mail app running on port ${port}!`));



