import mongoose from 'mongoose';
const productCollection = 'products';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true
  }
},{
  timestamps: true,
  versionKey: false});

 export const productModel = mongoose.model(productCollection, productSchema);

