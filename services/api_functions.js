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

module.exports = {
    addUser
}