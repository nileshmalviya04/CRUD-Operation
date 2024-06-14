const DBPool = require('./mysql_dbpool');

class MySQL extends DBPool {
    constructor(config) {
        super(config);
    }

    async query(sql, values) {
        // const pool = await this.connect();
        return await this.pool.query(sql, values);
    }

    async read(tableName, data = [], condition = '') {
        const sql = `SELECT * FROM ${tableName} ${condition}`;
        const results = await this.query(sql, data);
        return results && results[0] || [];
    }

    async remove(tableName, condition = '') {
        const sql = `DELETE FROM ${tableName} ${condition}`;
        console.log("sql::", sql);
        const results = await this.query(sql);
        console.log("Results::", results);
        return results;
    }

    async write(tableName, data) {
        console.log("Keys::", Object.keys(data));

        const columns = Object.keys(data).join(', ');
        const placeholders = Object.values(data).map(() => '?').join(', ');
        const sql = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders})`;
        const values = Object.values(data);
        await this.query(sql, values);
        return { message: 'Record inserted successfully!' };
    }


    async update(tableName, empname, data) {
        // console.log("Tablename::", tableName); => Employees
        // console.log("EmpName::", empname); 
        // => EmpName:: FName+LName
        // console.log("Data::", data); => Data:: {
        //   Address: 'Jaipur',
        //   Email: 'nilesh06@abc',
        //   Department: 'Full Stack Development'
        // }
        // console.log("Type of Data::", typeof (data)); => Object
        const updatedEmpName = empname.replace(/\+/, ' ');
        console.log("Updated EmpName::", updatedEmpName);
        const setColumns = Object.keys(data).map(key => `${key} = ?`).join(', ');
        // console.log("SetColumns::", setColumns); => SetColumns:: Address = ?, Email = ?, Department = ?
        const sql = `UPDATE ${tableName} SET ${setColumns} WHERE EmpName = ?`;
        // console.log("Sql::", sql);
        //  => UPDATE Employees SET Address = ?, Email = ?, Department = ? WHERE empname = ?
        const values = [...Object.values(data), updatedEmpName];
        // console.log("Values::", values); 
        // Values:: [
        //     'Jaipur',
        //     'nilesh06@abc',
        //     'Full Stack Development',
        //     'Nilesh+Malviya'
        //   ]
        // console.log("Query::", this.query(sql, values)); => Query:: Promise { <pending> };      
        await this.query(sql, values);
        return { message: 'Record updated successfully!' };
    }

}
module.exports = MySQL;
