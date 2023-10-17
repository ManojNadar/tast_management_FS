import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  deletedTask: {
    type: [Object],
  },
  completedTask: {
    type: [Object],
  },
});

export default mongoose.model("Users", userSchema);
