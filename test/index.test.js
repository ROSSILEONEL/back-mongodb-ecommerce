import app from '../app.js'
import mongoose from 'mongoose';
import request from 'supertest';
import { describe, it, expect , beforeAll, afterAll, expectTypeOf} from 'vitest';


describe('Main page Get /', () => {


  it('GET / main page, should respond with a 200 status code & html', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.type).toBe('text/html');
  });
});

describe('Product API Tests', () => { 
  let productId 
 
  beforeAll(async () => { 
    await mongoose.connect(process.env.MONGO_URL);
   }); 



    afterAll(async () => { 
      await mongoose.disconnect();
     });
    
   

it('GET /products - should return all products', async () => {
  const response = await request(app).get('/products');
  expect(response.statusCode).toBe(200);
  expect(response.body).toBeInstanceOf(Array);
  expect(response.body.length).toBeGreaterThan(0);
  const product = response.body[0];
  expect(product).toHaveProperty('_id');
  expect(product).toHaveProperty('name');
  expect(product).toHaveProperty('description');
  expect(product).toHaveProperty('price'); 
  expect(product).toHaveProperty('image'); 
  expect(product).toHaveProperty('stock');

    })

// ----------ADD NEW PRODUCTs------------------------
  it('POST /products/add - should add a new product', async () => {
    const newProduct = {
      name: 'product test',
    description: 'hay que ver el criterio eh',
    price: 99999,
  image: "https://picsum.photos/200/300",
  stock:999999
    }

   const response= await request(app).post('/products/add').send(newProduct)
   expect(response.body).toHaveProperty('name')
   productId = await  response.body._id

})


it('GET /products/:id - should return product data for a valid ID', async () => { 
      const response = await request(app).get(`/products/${productId}`).send(); 
      
      //-------CHECKS TYPES---------------- 
      expectTypeOf(response.body.price).toEqualTypeOf(Number);
      expectTypeOf(response.body.image).toEqualTypeOf(String);
      expectTypeOf(response.body.stock).toEqualTypeOf(Number);
      
      //-------CHECKS properties---------------- 
      expect(response.status).toBe(200); 
      expect(response.body).toHaveProperty('_id', productId); 
      // expect(response.body).toHaveProperty('name', 'Laptop'); 
      expect(response.body).toHaveProperty('name'); 
      expect(response.body).toHaveProperty('description'); 
      expect(response.body).toHaveProperty('price'); 
      expect(response.body).toHaveProperty('stock'); 
      expect(response.body).toHaveProperty('image'); 
    });


it('PUT /products/update - should update a product by ID', async () => {
 const updateProduct = {
   name: 'product test with update',
   description: 'hay que ver el criterio eh',
   price: 99999,
   image: "https://picsum.photos/200/300",
   stock:999999
 }
 
  const response= await request(app).put(`/products/update/${productId}`).send( {updateProduct}) 

  expect(response.body).toHaveProperty('name')
})





it('DELETE /products/delete/:id - should delete a product by ID', async () => {
  const response= await request(app).delete(`/products/delete/${productId}`).send()
  expect(response.body).toHaveProperty('name')
})



  



  })
  
  