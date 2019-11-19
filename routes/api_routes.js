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
    console.log(user); 
    try {
        let authorized = await api_functions.validate_user(user);
       // console.log(authorized,'FGGFGF');
        if (authorized) {
           // console.log(authorized,'UYHF');
            res.status(200).send('Welcome');
        }
        else{
            console.log(authorized,'WERT');
            res.status(401).send('Un Authorized');
        }
            
    } catch (error) {
        console.log('error' + error);
        console.log('api routes failed');
        res.status(400).send('Failed' + error);
        return;
    }
});



router.post('/api/dashboardSubscribePeople', async (req, res) => {
   
   let user = req.body;
    console.log("inside api routes");  
    console.log(user);
    try{  
        console.log("inside api");
        let resss = await api_functions.addToSubscribe(user);
        console.log("resss is");
        console.log(resss);
    res.status(200).send(resss);
    return;
    } catch(error){
        console.log('error'+error);
        res.status(400).send('Failed' + error);
        return;
    }
});






router.post('/api/dashboardAddEvent', async (req, res) => {
   
    let user = req.body;
     console.log("inside api routes");  
     console.log(user);
     try{  
         console.log("inside addevent api");
         let resss = await api_functions.addToEvents(user);
         console.log("resss is");
         console.log(resss);
     res.status(200).send(resss);
     return;
     } catch(error){
         console.log('error'+error);
         res.status(400).send('Failed' + error);
         return;
     }
 });



 router.post('/api/dashboardBlockPeople', async (req, res) => {
   
    let user = req.body;
     console.log("inside api routes of block people");  
     console.log(user);
     try{  
         console.log("inside addevent api of block");
         let resss = await api_functions.addToBlackList(user);
         console.log("resss is");
         console.log(resss);
     res.status(200).send(resss);
     return;
     } catch(error){
         console.log('error'+error);
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
        console.log(event_list);
        res.status(200).send(event_list);
    } catch (error) {
        console.log('error' + error);
        res.status(400).send('Failed' + error);
        return;
    }
});




router.get('/api/getName', async (req, res) => {
    let user = {
        email: req.query.email
      
    }
    try {
        let name = await api_functions.getDashboardName(user);
        console.log("name is");
        console.log(name);
        res.status(200).send(name);
    } catch (error) {
        console.log("error in awaiting");
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

module.exports = router;