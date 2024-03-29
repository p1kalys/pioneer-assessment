require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rootRouter = require("./routes/index");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const app = express();

app.use(express.json());
app.set("trust proxy", true);
app.use("/", rootRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const connectToDB = () => {
  mongoose.connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Database is connected!");
      app.listen(3000);
    })
    .catch(error => {
      console.error("Error connecting to database:", error);
    });
};


connectToDB();
