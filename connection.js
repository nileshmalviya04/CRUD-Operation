const mongoose = require('mongoose');

class Connection {
  constructor() {
    (async () => {
      try {
        await mongoose.connect("mongodb://127.0.0.1:27017/Users", {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.log("MongoDB Connected!");
      } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); 
      }
    })();
  }
}

module.exports = Connection;
