import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { currentuser, login, register } from "./Controllers/UserController.js";
import { addTask, getEditTask, myTask, updateTask } from "./Controllers/TaskController.js";

const app = express();
dotenv.config();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// User Routes

app.post("/register", register);
app.post("/login", login);
app.post("/currentuser", currentuser);

// Task Routes

app.post("/addtask", addTask);
app.post("/mytask", myTask);
app.post("/getedittask", getEditTask);
app.post("/updatetask", updateTask);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB CONNECTED"))
  .catch(() => console.log("DB error"));

app.listen(8000, () => {
  console.log("server running on port 8000");
});
