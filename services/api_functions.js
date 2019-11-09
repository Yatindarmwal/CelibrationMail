'use strict';

const db = require('./database');


async function addUser(user) {
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO users (name,email,timezone,password) values ('${user.name}','${user.email}','${user.timezone}','${user.password}')`, function (err, result, fields) {
            if (err) reject(err);
            resolve(result);
        });
    });
}

async function validate_user(user) {
    return new Promise((resolve, reject) => {
        db.query(`SELECT users.password FROM users WHERE users.email = '${user.email}'`, function (err, result, fields) {
            if (err) reject(err);
            if (result[0] && result[0].password == user.password)
                resolve(true);
            else
                resolve(false);
        });
    });
}

async function getEventList(user) {
    return new Promise((resolve, reject) => {
        db.query(`SELECT events.title, events.recuring_date FROM users INNER JOIN events on events.user_id = users.id  WHERE users.email = '${user.email}'`, function (err, result, fields) {
            if (err) reject(err);
            result = result.map((event) => {
                event.recuring_date = new Date(event.recuring_date * 1000);
                return event;
            });
            resolve(result);
        });
    });
}

async function getSubscriptionList(user) {
    return new Promise((resolve, reject) => {
        db.query(`SELECT subscription_list.suscribed_email FROM users INNER JOIN subscription_list on subscription_list.user_id = users.id  WHERE users.email = '${user.email}'`, function (err, result, fields) {
            if (err) reject(err);
            result = result.map((suscriber) => {
                return suscriber;
            });
            resolve(result);
        });
    });
}

async function getBlackList(user) {
    return new Promise((resolve, reject) => {
        db.query(`SELECT blacklist.blacklisted_email FROM users INNER JOIN blacklist on blacklist.user_id = users.id  WHERE users.email = '${user.email}'`, function (err, result, fields) {
            if (err) reject(err);
            result = result.map((suscriber) => {
                return suscriber;
            });
            resolve(result);
        });
    });
}


async function getSuscribersList(user) {
    return new Promise((resolve, reject) => {
        db.query(`SELECT users.email FROM users INNER JOIN subscription_list ON users.id = subscription_list.user_id WHERE subscription_list.suscribed_email = '${user.email}'`, function (err, result, fields) {
            if (err) reject(err);
            result = result.map((suscriber) => {
                return suscriber;
            });
            resolve(result);
        });
    });
}



module.exports = {
    addUser,
    validate_user,
    getEventList,
    getSubscriptionList,
    getBlackList,
    getSuscribersList
}