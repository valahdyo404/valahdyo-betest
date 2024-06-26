require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const accountRoutes = require('./routes/accountRoutes');
// const KafkaConsumer = require('./kafka/KafkaConsumer.js');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

const app = express();

app.use(express.json());
app.use('/api', authRoutes);
app.use('/api', accountRoutes);
app.use('/api', userRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


const startApp = async () => {
  // Connect to MongoDB
  await mongoose.connect(process.env.MONGODB_URI);

  // Instantiate and start the Kafka consumer
  // const consumer = new KafkaConsumer('localhost:9092', 'user-group', 'user-info-topic');
  // await consumer.connect();
  // await consumer.start();

  // console.log('Kafka consumer started and listening for messages...');
};

startApp().catch(console.error);
module.exports = app;
