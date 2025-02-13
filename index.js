const express = require("express");
const dotenv = require("dotenv")
const connectDB = require("./db/database");
const userroutes = require("./src/routes/userroutes");
const projectroutes = require("./src/routes/projectroute");
const taskroutes = require("./src/routes/taskroute");
dotenv.config();
const app = express();
const cors = require("cors");

app.use(cors());

//body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//connect to database
connectDB();



//routes
app.use("/nextup", userroutes);
app.use("/nextup/projects", projectroutes);
app.use("/nextup/projects/tasks", taskroutes);



//home
app.get("/", (req, res) => {
    res.send("Hello World");
});

//app listen
app.listen(process.env.PORT, () => {
    console.log("Server is running on port " + process.env.PORT);
});