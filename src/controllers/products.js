import { productModel } from "../models/productModel.js";

export class ProductsController {
  static async getAllProducts(req, res) {
    const products = await productModel.find({});
    if (products) {
      res.status(200).send(products);
    } else {
      res.send("No se encontraron productos");
    }
  }

  static async getProductById(req, res) {
    const { id } = req.params;

    const product = await productModel.findById(id).catch((err) => {
      console.log(err, "ERROR");
      res.send({ error: "No se encontro el producto" });
    });
    res.send(product);
  }

  static async addProduct(req, res) {
    const { name, description, price, image, stock } = req.body;
  const newProduct = await productModel
    .create({
      name: name,
      description: description,
      price: price,
      image: image,
      stock: stock,
    })
    .catch((err) => {
      console.log(err, "ERROR");
    });
    
  res.status(200).send(newProduct);
  }

  static async updateProduct(req, res) {

    console.log('entro al update');
    
    const { id } = req.params;
    console.log(id,'id del params');
    
    const { name, description, price, image, stock } = req.body;
    console.log(name, description, price, image, stock);
    
    const product = await productModel.findByIdAndUpdate( id, {
      name: name,
      description: description,
      price: price,
      image: image,
      stock: stock,
    });

    if (product) {
      res.send(product);
    }else{
      res.send("No se encontro el producto");
    }
  }

  static async deleteProduct(req, res) {
    
    const { id } = req.params;
    console.log(id,'id del params');
    
    const product = await productModel.findByIdAndDelete(id);
    if (product) {
      res.send(product);
    } else {
      res.send("No se encontro el producto");
    }
  }
}