import mongoose from "mongoose";

const mesaggeCollection = 'messages';

const MessageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

export const messagesModel = mongoose.model(mesaggeCollection, MessageSchema);