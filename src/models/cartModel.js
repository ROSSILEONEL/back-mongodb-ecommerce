import mongoose from "mongoose";

const cartCollection = 'cart';



const cartSchema =  mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        index: true,
        required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'products', // Referencia al modelo de producto
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      }
    ],
    totalAmount: {
      type: Number,
      default: 0,
    }
  },{
    timestamps: true,
    versionKey: false});

  cartSchema.pre('find',function(){
    this.populate('items.productId')
  })

export const cartModel = mongoose.model(cartCollection, cartSchema)