import mongoose, { mongo } from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  mobile: {
    type: Number,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true
  }
}, {timestamps: true});

export const User = mongoose.model('User', UserSchema);