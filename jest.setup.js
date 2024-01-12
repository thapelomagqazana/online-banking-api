const mongoose = require('mongoose');
const { setup } = require('jest-environment-node');

module.exports = async function globalSetup(globalConfig) {
  // Set up the test environment
  const server = await setup(globalConfig);

  // Dynamically choose a random port for testing
  const randomPort = Math.floor(Math.random() * 5000) + 3000;

  // Connect to MongoDB
  await mongoose.connect('mongodb://localhost:27017/user-auth-tdd-test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Assign the server and port to the global object
  global.server = server;
  global.PORT = randomPort;

  // Close the MongoDB connection after all tests are completed
  afterAll(async () => {
    await mongoose.connection.close();
  });
};