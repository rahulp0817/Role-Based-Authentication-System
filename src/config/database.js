const mongoose = require('mongoose');

const database = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log(`Connected to: ${connect.connection.host}, ${connect.connection.name}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  };
}

module.exports = database;