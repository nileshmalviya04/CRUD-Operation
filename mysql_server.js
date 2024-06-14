const express = require('express');
const bodyParser = require('body-parser');
const EmpService = require('./mysql_empservice');
const DBPool = require('./mysql_dbpool');
const MySQL = require('./mysql');

const app = express();
// console.log("PORT ::",process.env.PORT);
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'Employees'
};


const mySQL = new MySQL(dbConfig);

const empService = new EmpService(mySQL);

app.post('/empadd', async (req, res) => {
  try {
    const newEmployee = req.body;
    const result = await empService.addEmp(newEmployee);
    res.status(201).json(result);
    console.log('Data Inserted Successfully');
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding employee' });
  }
});


app.get('/employees', async (req, res) => {
  try {
    const { name } = req.query;
    const condition = name ? `WHERE EmpName = ?` : '';
    const data = name ? [name] : [];
    // console.log("data:", data);
    const employees = await empService.getEmp(data, condition);
    res.status(200).json(employees);
    console.log('Data Fetched Successfully');
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching employees' });
  }
});

app.delete('/empdelete', async (req, res) => {
  try {
    const { EmpName } = req.query;
    console.log("Name ::", EmpName);
    const condition = EmpName ? `WHERE EmpName = "${EmpName}"` : '';
    const data = EmpName ? [EmpName] : [];
    console.log("data ::", data);
    console.log("condition ::", condition);
    const employees = await empService.removeEmp(condition);
    console.log("employees::", employees);
    res.status(200).json(employees);
    console.log('Data Removed Successfully');
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting employees' });
  }
}); 

app.put('/empupdate/:empname', async (req, res) => {
  try {
    const name = req.params.empname;
    // console.log("name::", name);
    const updatedData = req.body;
    // console.log("updatedData::", updatedData);
    const result = await empService.updateEmp(name, updatedData);
    // console.log("result::", result);
    res.status(200).json(result);
    console.log('Employee data Updated Successfully');
    return result ? [result] : [];
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating employee' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
