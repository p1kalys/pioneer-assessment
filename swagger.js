const swaggerJSDoc = require("swagger-jsdoc");

const Options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "PioneerLabs-Backend-Assignment",
      version: "1.0.0",
      description:
        "The assignment involves setting up user authentication with JWT, developing API endpoints to fetch data, documenting the API using Swagger for better understanding, securing API endpoints for authenticated users, and retrieving Ethereum balance from wallet using web3.js.",
    },
    servers: [
      {
        url: "https://pioneer-assessment-gdi5.onrender.com",
        description: "Development Server",
      },
    ],
  },
  apis: ["./routes/**/*.js", "./controllers/**/*.js"],
};

const swaggerSpec = swaggerJSDoc(Options);

module.exports = swaggerSpec;
