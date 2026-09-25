const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const router=require("./Routes/routes.js");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api",router);
mongoose
    .connect(process.env.db_Url_Online_Learning_Platform)
    .then(() => {
        console.log("MongoDB connected");

        app.listen(process.env.PORT, () => {
            console.log(
`Server running on port ${process.env.PORT}`
            );
        });
    })
    .catch(error => {
        console.log(error);
    });