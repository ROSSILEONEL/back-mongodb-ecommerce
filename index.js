import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import productRouter from "./src/routes/products.js";
import cartRouter from "./src/routes/cart.js";
import usersRouter from "./src/routes/users.js";
import authRouter from "./src/routes/auth.js";
import session from "express-session";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import { createRoles } from "./src/utils/initialSetup.js";
const PORT = process.env.PORT ?? 8080;


const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: "secretCode",
    resave: true,
    saveUninitialized: true,
    
    store: MongoStore.create({ mongoUrl: 'mongodb+srv://Siria:Colita@shopping.5n8oq3t.mongodb.net/?retryWrites=true&w=majority&appName=shopping',
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    ,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
      secure: true }
  })}))

  

dotenv.config();
app.use("/products", productRouter);
app.use("/cart", cartRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Bienvenido a API commerce</title>
      </head>
      <body>
        <h1>Bienvenido</h1>
        <p>Prueba este enlace para ir a <a href="/products">Products</a></p>
      </body>
    </html>
  `);
});


mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {console.log("MongoDB connected in Rossi Shopping App"),
     createRoles()})
  .catch((err) => {
    if (err) {
      console.log("Happened an error while connecting to MongoDB", err);
      process.exit(1); 
      }
      });
      
     
     if (mongoose.connection.readyState == 1) {
      
    }
    


app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);
