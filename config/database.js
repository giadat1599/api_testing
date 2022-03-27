const mongoose = require('mongoose');

const connect = async () => {
  try {
    const conn = await mongoose.connect(`${process.env.DATABASE_URL}`, {
      autoIndex: true,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log('Failed to connect to MongoDB: ', error);
    process.exit(1);
  }
};

module.exports = connect;
