'use strict';

const db = require('../services/database');
let dummy_db = [];  //fake dummy Database
let mails_to_send = [];  //mail queue

console.log('running');

dummy_db.push({     //fake entry in DB 
    name: 'Yatin',
    email: 'yatin@gmail.com',
    time_zone: 5,
    special_moment: 'Birthday',
    date: 871516800000,
    subscription_list: ['ram@gmail.com', 'tim@gmail.com', 'pinku@gmail.com'],
    blacklist: ['neha@gmail.com'],
    last_wished_on: null
});

dummy_db.push({    //fake entry in DB 
    name: 'Yatin',
    email: 'yatin@gmail.com',
    time_zone: -2,
    special_moment: 'Birthday',
    date: 882057600000,
    subscription_list: ['ram@gmail.com', 'tim@gmail.com', 'pinku@gmail.com'],
    blacklist: [],
    last_wished_on: null
});

setInterval(function () { processCelebrationMail(); }, 60000 * 60);    // to get data from db and populate email array

setInterval(function () { sendMailFromQueue(); }, 60000 * 60);    // to send mail


function processCelebrationMail() {
    getDataFromDb().then((user_data) => {
        for (let i = 0; i < user_data.length; i++) {
            let special_user = user_data[i];
            if (!isSpecialMomentValid(special_user.date))
                continue;
            pushUserToQueue(special_user);
            for (let j = 0; j < user_data.length; j++) {
                let user = user_data[i];
                if (qualifiedyForMail(user, special_user)) {
                    user.to_wish = special_user.email;
                    user.to_wish_ocation = special_user.special_moment;
                    pushUserToQueue(user);
                }
            }
        }
        sendMailFromQueue();
    });
}

function sendMailFromQueue() {
    mails_to_send = mails_to_send.filter((user) => {
        return user;
    });
    let current_hour = new Date().getHours() + 1;
    for (let i = 0; i < mails_to_send.length; i++) {
        let user = mails_to_send[i];
        if (user) {
            if (user.time_to_send_mail = current_hour) {
                sendMail(user).then(() => {
                    if (!user.to_wish)   // this means he was the one who had the special ocation
                        updateDb(user.email);
                    mails_to_send[i] = null;
                });
            }
        }
    }
}


function updateDb(email) {
    console.log(`db updated for ${email}`);
    // update last wish date on db based on email id eg UPDATE users set lastwished = current date where email = email;
    return;
}

function sendMail(user) {    // mimic node mailer 
    return new Promise((resolve, reject) => {
        let content;
        if (user.to_wish)
            content = `Its ${user.to_wish}'s ${user.to_wish_ocation}`;
        else
            content = `Happy ${user.special_moment}`;
        //use node mailer to send mail
        console.log(`mail sent to ${user.email} with content ${content}`);
        resolve('mail Sent');
    });
}

function pushUserToQueue(user) {
    user.time_to_send_mail = getTimeTosendMail(user);
    mails_to_send.push(user);
}

function getTimeTosendMail(user) {
    let time_to_send_mail = 8 - user.time_zone;
    return time_to_send_mail;
}


function qualifiedyForMail(user, special_user) {
    if (user.subscription_list.indexOf(special_user.email) != -1 && special_user.blacklist.indexOf(user.email) == -1) {   //check of subscription list  and blacklist
        return true;
    }
    return false;
}

function isSpecialMomentValid(date) {
    let current_time = new Date();
    let user_date = new Date(date);
    if (current_time.getMonth() == user_date.getMonth() && current_time.getDate() == user_date.getDate()) {
        return true;
    }
    return false;
}


function getDataFromDb() {
    return new Promise((resolve, reject) => {
        db.query(`SELECT
        users.name,
        users.email,
        users.timezone,
        events.title as special_moment,
        events.recuring_date date,
        events.last_wished_on
      FROM
        users
        LEFT JOIN events ON users.id = events.user_id`, function (err, result, fields) {
            if (err) reject(err);
            resolve(result);
        });
    });
}


// isSpecialMomentValid(dummy_db[0]);