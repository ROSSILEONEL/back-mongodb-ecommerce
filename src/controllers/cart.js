import { cartModel } from "../models/cartModel.js";


export class CartController {

  static async getCart(req, res) {
    // const {id}= req.query;
    const { id } = req.params;
    console.log('====================================');
    console.log('id del req',id);
    
    //verifico que hay en la cookie 
    if(!id){
      res.status(404).send("No existe el carrito");
    }
    const cart = await cartModel.find({ userId: id });
  console.log('====================================');
  console.log('cart',cart);
  
    if (!cart) {
      res.send("No hay carrito");
    } else {
     res.cookie("cart", JSON.stringify(cart), { maxAge: 60 * 60 * 1000, signed: true });
    
     res.cookie("userId", JSON.stringify(id), { maxAge: 60 * 60 * 1000, signed: true });
      res.status(200).send(cart);
    }
  }
  
  static async addToCart(req, res) {
    const { userId, productId, quantity } = req.body;
    try {
      // cargar el carrito
      const cart = await cartModel
        .findOne({ userId })
        .then((cart) => {
          console.log(JSON.stringify(cart, null, "\t"));

          return cart;
        })
        .catch((err) => {
          console.log(err);
        });

      if (!cart) {
        cartModel.create({
          userId: userId,
          items: [
            {
              productId: productId,
              quantity: quantity,
            },
          ],
          totalAmount: 0,
        });
        console.log("No hay carrito");

        res.send({
          result: "success",
          payload: "El producto se ha agregado al carrito",
        });
      } else {
        await cartModel
          .findOneAndUpdate(
            { userId },
            { $push: { items: { productId, quantity: quantity } } }
          )
          .then(
            res.send({
              result: "success",
              payload: "El producto ya existe en el carrito",
              message: cart,
            })
          )
          .catch((err) => {
            res.send({ result: "error", message: err.message });
          });
      }
    } catch (error) {
      res.send({ result: "error", message: error.message });
    }
  }
  
  static async updateCart(req, res) {
    const { userId, items } = req.body;
    await cartModel
      .findOneAndUpdate({ userId }, { $set: { items: items } })
      .then(
        res.send({
          result: "success",
          payload: "El carrito se ha actualizado",
          message: items,
        })
      )
      .catch((err) => {
        res.send({ result: "error", message: err.message });
      });
  }
  
  static async updateCartItemQuantity(req, res) {
const { productId, quantity} = req.body
const cartId = req.params.id
    const data = await cartModel.updateOne(
      { _id:cartId, 'items.productId': productId },
      { $set: { 'items.$[elem].quantity': quantity } },
      { arrayFilters: [{ 'elem.productId': productId }] }
    ).then(
      res.send({
        result: "success",
        payload: "El producto se ha actualizado",
      })
    )
    .catch((err) => {
      res.send({ result: "error", message: err.message });
    });
    
  }
  
  static async removeFromCart(req, res) {
   
const {cartId, productId} = req.body
    const data = await cartModel.updateOne(
   {_id:cartId},
      { $pull: { items: { productId: productId } } }
    )
    .then(
      res.send({
        result: "success",
        payload: "El producto se ha eliminado del carrito",
      })
    )
    .catch((err) => {
      res.send({ result: "error", message: err.message });
    });
    // const dataWasModified = data.modifiedCount > 0
    // return {
    //   productRemoved: dataWasModified
    // }
  console.log('====================================');
  console.log(data)
  console.log('====================================');
  }
  
}
