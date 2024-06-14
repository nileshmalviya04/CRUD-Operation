const Connection = require('./connection');
const mongoose = require('mongoose');

class Mongo extends Connection {
  constructor(collectionName) {
    super(); 
    this.collectionName = collectionName;
    const userSchema = new mongoose.Schema({
      username: { type: String, required: true },
      age: { type: Number, required: true },
      gender: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      address: { type: String, required: true },
    });
    this.User = mongoose.model(collectionName, userSchema); 
  }


  async write(data) {
    try {
      const newUser = new this.User(data);
      await newUser.save();
      return newUser;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error; 
    }
  }

  async remove(filter = {}) {
    try {
      const User = await this.User.deleteOne(filter);
      return User;
    } catch (error) {
      console.error('Error Deleting User:', error);
      throw error; 
    }
  }

  async read(filter = {}) {
    try {
      const users = await this.User.find(filter);
      return users;
    } catch (error) {
      console.error('Error reading users:', error);
      throw error;
    }
  }

  async update(updateData){
      try {
        // console.log("UpdateData::", updateData);
        const { username, ...updateDataWithoutName} = updateData;
        console.log('USERNAME::', username);
        if(!username) {
          throw new Error('Missing username property in update data!');
        }
        
        const updatedUser = await this.User.updateOne({username}, updateDataWithoutName, { new: true });
  
        if(!updatedUser) {
          throw new Error('User not found');
        }
        return updateData;
      } catch (error) {
        console.error('Error updating user:', error);
        throw error;
      }
    }
}

module.exports = Mongo;
