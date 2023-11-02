const mongoose = require('mongoose');

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
    });

    console.log(`MongoDB Database connected with HOST: ${mongoose.connection.host}`);
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
  }
};

module.exports = connectDatabase;
