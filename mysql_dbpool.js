const mysql = require('mysql2/promise');

class DBPool {
  constructor(config ) {
    this.config = config;
    this.pool = mysql.createPool(this.config);
    console.log("Mysql Connection build Successfully");
  }
}


module.exports = DBPool;
