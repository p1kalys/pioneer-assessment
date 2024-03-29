require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rootRouter = require("./routes/index");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const app = express();

app.use(cors());
app.use(express.json());
app.set("trust proxy", true);
app.use("/", rootRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.send(`
<div>          
<h1> Pioneer Backend Assignment </h1>
<p>An API ENDPOINT mechanism</p>
</div>
    `);
});
const connectToDB = () => {
  try {
    mongoose.connect(process.env.MONGO_URL);
    console.log("Database is connected!");
    app.listen(3000);
  } catch (error) {
    console.log(error);
  }
};

connectToDB();
