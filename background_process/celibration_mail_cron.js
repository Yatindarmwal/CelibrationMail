'use strict';

const db = require('../services/database');
var mails_to_send = [];  //mail queue

setInterval(function () { processCelebrationMail(); }, 60000 * 60);    // runs ever hour 

async function processCelebrationMail() {
    try {
        let user_data = await getDataFromDb();
        for (let i = 0; i < user_data.length; i++) {
            let special_user = user_data[i];
            if (special_user.subscription_list)
                special_user.subscription_list = special_user.subscription_list.split(',');
            if (special_user.blacklist)
                special_user.blacklist = special_user.blacklist.split(',');
            if (!isSpecialMomentValid(special_user))
                continue;
            pushUserToQueue(special_user);
            for (let j = 0; j < user_data.length; j++) {
                let user = user_data[j];
                if (qualifiedyForMail(user, special_user)) {
                    user.to_wish = special_user.email;
                    user.to_wish_ocation = special_user.special_moment;
                    pushUserToQueue(user);
                }
            }
        }
        sendMailFromQueue();
    } catch (err) { throw err }
}

async function sendMailFromQueue() {
    mails_to_send = mails_to_send.filter((user) => {
        return user;
    });
    let current_hour = new Date().getHours() + 1;
    for (let i = 0; i < mails_to_send.length; i++) {
        let user = mails_to_send[i];
        if (user) {
            if (user.time_to_send_mail = current_hour) {
                await sendMail(user)
                if (!user.to_wish)   // this means he was the one who had the special ocation
                    await updateDb(user.event_id);
                mails_to_send[i] = null;
            }
        }
    }
}


function updateDb(event_id) {
    // update last wish date on db based on email id eg UPDATE users set lastwished = current date where email = email;
    return new Promise((resolve, reject) => {
        db.query(`UPDATE events SET last_wished_on = ${Math.round((new Date()).getTime() / 1000)} WHERE id = ${event_id} `, function (err, result, fields) {
            if (err) reject(err);
            resolve(result);
        });
    });
}

async function sendMail(user) {    // mimic node mailer 
    try {
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
    } catch (err) { throw err }
}

function pushUserToQueue(user) {
    try {
        user.time_to_send_mail = getTimeTosendMail(user);
        mails_to_send.push(user);
    } catch (err) { throw err }
}

function getTimeTosendMail(user) {
    try {
        let time_to_send_mail = 8 - user.time_zone;
        return time_to_send_mail;
    } catch (err) { throw err }
}


function qualifiedyForMail(user, special_user) {
    try {
        if ((user.subscription_list && user.subscription_list.indexOf(special_user.email) != -1) && (special_user.blacklist && special_user.blacklist.indexOf(user.email) == -1)) {   //check of subscription list  and blacklist
            return true;
        }
        return false;
    } catch (err) { throw err }
}

function isSpecialMomentValid(user) {
    try {
        if (!(user.last_wished_on < (Math.round((new Date()).getTime() / 1000) - 31556952))) return false;
        let current_time = new Date();
        let user_date = new Date(user.date * 1000);
        if (current_time.getMonth() == user_date.getMonth() && current_time.getDate() == user_date.getDate()) {
            return true;
        }
        return false;
    } catch (err) { throw err }
}


function getDataFromDb() {
    return new Promise((resolve, reject) => {
        db.query(`SELECT
        users.name,
        users.email,
        users.timezone as time_zone,
        events.title as special_moment,
        events.recuring_date date,
        processed_users.subscription_list as subscription_list,
        processed_users.blacklist as blacklist,
        events.last_wished_on,
        events.id as event_id
      FROM
        users
        LEFT JOIN events ON users.id = events.user_id
        LEFT JOIN (
          SELECT
            users.id,
            GROUP_CONCAT(subscription_list.suscribed_email) as subscription_list,
            GROUP_CONCAT(blacklist.blacklisted_email) as blacklist
          FROM
            users
            LEFT JOIN subscription_list ON subscription_list.user_id = users.id
            LEFT JOIN blacklist ON blacklist.user_id = users.id
          GROUP BY
            users.id
        ) as processed_users ON processed_users.id = users.id`, function (err, result, fields) {
            if (err) reject(err);
            resolve(result);
        });
    });
}



module.exports = {
    processCelebrationMail,
    sendMailFromQueue
}
