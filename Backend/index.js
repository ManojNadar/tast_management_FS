import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { currentuser, login, register } from "./Controllers/UserController.js";
import {
  addTask,
  deleteTask,
  getEditTask,
  myTask,
  updateTask,
} from "./Controllers/TaskController.js";
import { UserMiddleWare } from "./Middlewares/UserMiddleWare.js";

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

app.post("/addtask", UserMiddleWare, addTask);
app.post("/mytask", UserMiddleWare, myTask);
app.post("/getedittask", UserMiddleWare, getEditTask);
app.post("/updatetask", UserMiddleWare, updateTask);
app.post("/deletetask", UserMiddleWare, deleteTask);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB CONNECTED"))
  .catch(() => console.log("DB error"));

app.listen(8000, () => {
  console.log("server running on port 8000");
});
