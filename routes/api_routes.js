'use strict';

const express = require('express');
const router = express.Router();
const api_functions = require('../services/api_functions');
router.get('/api', function (req, res) {
    res.status(200).send('celibration mail api');
});

router.post('/api/register_user', async (req, res) => {
    let user = req.body;
    try {
        await api_functions.addUser(user);
        res.status(200).send('Congrats Account created please login');
    } catch (error) {
        console.log('error' + error);
        res.status(400).json(error);
    }
});

router.post('/api/login', async (req, res) => {
    let user = req.body;
    try {
        let authorized = await api_functions.validate_user(user);
        if (authorized)
            res.status(200).send('Welcome');
        else
            res.status(401).send('Un Authorized');
    } catch (error) {
        console.log('error' + error);
        res.status(400).send('Failed' + error);
        return;
    }
});

router.get('/api/get_event_list', async (req, res) => {
    let user = {
        email: req.query.email
    }
    try {
        let event_list = await api_functions.getEventList(user);
        res.status(200).send(event_list);
    } catch (error) {
        console.log('error' + error);
        res.status(400).send('Failed' + error);
        return;
    }
});

router.get('/api/get_black_list', async (req, res) => {
    let user = {
        email: req.query.email
    }
    try {
        let suscribtion_list = await api_functions.getBlackList(user);
        res.status(200).send(suscribtion_list);
    } catch (error) {
        console.log('error' + error);
        res.status(400).send('Failed' + error);
        return;
    }
});

router.get('/api/get_subscription_list', async (req, res) => {
    let user = {
        email: req.query.email
    }
    try {
        let suscribtion_list = await api_functions.getSubscriptionList(user);
        res.status(200).send(suscribtion_list);
    } catch (error) {
        console.log('error' + error);
        res.status(400).send('Failed' + error);
        return;
    }
});

router.get('/api/get_subscribers_list', async (req, res) => {
    let user = {
        email: req.query.email
    }
    try {
        let suscribtion_list = await api_functions.getSuscribersList(user);
        res.status(200).send(suscribtion_list);
    } catch (error) {
        console.log('error' + error);
        res.status(400).send('Failed' + error);
        return;
    }
});

module.exports = router