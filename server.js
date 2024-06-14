const express = require('express');
const bodyParser = require('body-parser');
const Mongo = require('./mongo');

const app = express();
const port = process.env.PORT || 3000;

const mongo = new Mongo('users');

app.use(bodyParser.json());

app.post('/addusers', async (req, res) => {
  try {
    const newUser = await mongo.write(req.body);
    res.status(201).send({ message: 'User created successfully!', data: newUser });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send({ message: 'Error creating user!' });
  }
});

app.delete('/remusers', async (req, res) => {
  try {
    let filter = {};
    if (req.query.name) {
      filter = { username: req.query.name };
    }
    const users = await mongo.remove(filter);
    res.status(200).send({ message: "User Deleted Successfully!" });
  } catch (error) {
    console.error('Error deleting users:', error);
    res.status(500).send({ message: 'Error Deleting users' });
  }
});

app.get('/users', async (req, res) => {
  try {

    let filter = {};
    console.log('Username::', req.query.username);
    if (req.query.username) {
      filter = { username: req.query.username };
    }
    console.log('Filter::', filter);
    const users = await mongo.read(filter);
    //   console.log("Users::", users);
    //   console.log("Users::", typeof users) => Object
    res.status(200).send({ message: 'Users retrieved successfully!', data: users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send({ message: 'Error fetching users!' });
  }
});

// Give data in the form of json body, including name. 
// The name in the json body will be used to find and update the existing data.
app.put('/update/:name', async (req, res) => {
  try {
      const updateData = req.body;
      const updatedUser = await mongo.update(updateData);
      res.status(200).send({ message: 'User Updated Successfully', data: updatedUser});
  } catch(error) {
    res.status(400).send({ message: 'Error updating user!', error: error.message })
  }
});



app.listen(port, () => console.log(`Server listening on port ${port}`));

