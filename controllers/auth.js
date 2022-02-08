let mysql = require('mysql');
require('dotenv').config();

class Connection {
    constructor(){
        if(!this.pool){
            console.log('Creating connection pool...');
            this.pool = mysql.createPool(process.env.CLEARDB_DATABASE_URL);
            return this.pool;
        }
        return this.pool;
    }
}

const instance = new Connection();

instance.queryWrapper = (query, params) => {
    return new Promise((resolve, reject) => {
        if(error){
            console.log("DB query failed", error);
            return reject(error);
        } else {
            console.log("Successfully processed DB query");
            resolve(results);
        }
    })
}

module.exports = instance;