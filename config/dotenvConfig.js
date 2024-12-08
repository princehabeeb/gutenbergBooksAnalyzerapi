const dotenv = require("dotenv");

const loadEnvironmentVariables = () => {
  const result = dotenv.config();

  if (result.error) {
    throw new Error("Failed to load environment variables. Ensure a .env file exists.");
  }

  console.log("Environment variables loaded successfully");
};

module.exports = loadEnvironmentVariables;
