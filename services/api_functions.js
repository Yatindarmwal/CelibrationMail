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

async function addToSubscribe(user)

{
    console.log(user);
   
          return new Promise((resolve,reject) => {
        
            db.query(`INSERT INTO subscription_list  (suscribed_email,user_id) values ('${user.email}', (SELECT users.id from users where users.email = '${user.login_email}'))`,function (err,rresult,fields)
            {
                if(err) 
                {
                    console.log("theres error");

                    reject(err);
                }
                else
                {
                  //  document.querySelector(".addpeoplepopup").style.display = "none";
                resolve(true);
                }
            });
        });
       
    }


async function addToEvents(user)
{
    console.log(user);
   
          return new Promise((resolve,reject) => {
        
            db.query(`INSERT INTO events  (title, recuring_date, user_id,last_wished_on) values ('${user.event}','${user.eventDate}', (SELECT users.id from users where users.email = '${user.login_email}'),0)`,function (err,rresult,fields)
            {
                if(err) 
                {
                    console.log("theres error");

                    reject(err);
                }
                else
                resolve(true);
            });
        });
       
    }


 /*   async function getDashboardName(user)
{
    console.log("user iside getdashboardname", user);
   
          return new Promise((resolve,reject) => {
        
            db.query(`SELECT users.name from users where users.email = '${user.email}'`),function (err,result,fields)
            {   
                
                if(err)  
                {
                    console.log("theres error");

                    reject(err);
                }
                else
               // resolve(true);
               {
                   console.log("no error");
                   return(result);
               resolve(result);
               }
            } 
        });
       
    }
    */
   async function getDashboardName(user)
{
    console.log("user iside getdashboardname", user);
   
          return new Promise((resolve,reject) => {
        
            db.query(`SELECT users.name from users where users.email = '${user.email}'`,function (err,result,fields)
            {   
                
                if(err) 
                {
                    console.log("theres error");

                    reject(err);
                }
                else
               // resolve(true);
               {
                   console.log("no error");
                   return(result);
               resolve(result);
               }
            });
        });
       
    }

async function addToBlackList(user)
{
    console.log(user);
   
          return new Promise((resolve,reject) => {
        
            db.query(`INSERT INTO blacklist  (blacklisted_email, user_id) values ('${user.email}', (SELECT users.id from users where users.email = '${user.login_email}'))`,function (err,rresult,fields)
            {
                if(err) 
                {
                    console.log("theres error");

                    reject(err);
                }
                else
                resolve(true);
            });
        });
       
    }
  //  }
//});
//}







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
        console.log("insise api funcn");
        db.query(`SELECT events.title, events.recuring_date FROM users INNER JOIN events on events.user_id = users.id  WHERE users.email = '${user.email}'`, function (err, result, fields) {
            if (err)
            {
                console.log("query error");
                 reject(err);
            }
            result = result.map((event) => {
                event.recuring_date = new Date(event.recuring_date * 1000);
              //  console.log("event is");
              //  console.log(event);
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
    getSuscribersList,
    addToSubscribe,
    addToEvents,
    addToBlackList,
    getDashboardName
                }