// import { userModel } from "../models/userModel.js";
// import { cartModel } from "../models/cartModel.js";
// import { comparePassword } from "../utils/utils.js";
// import { generateToken } from "../utils/auth.js";
// import jwt from "jsonwebtoken";

// export class loginController {
 
 
//   static async signIn(req, res) {
//     const { email, password } = req.body;

//     const user = await userModel.findOne({ email }).populate("roles");

    
//     if (user.length < 1) {
//       res.send({ status: "error", message: "Usuario no encontrado" });
//     }
//     const isMatch = comparePassword(password, user);
//     if (!isMatch) {
//       res.send({
//         status: "error",
//         message: "Usuario o contraseña incorrectos",
//       });
//     } else {
//       // jwt.sign({objeto con datos}, 'Secretkey', {expiresIn: '1h'})
//      const token = generateToken(user);

//       res.send({
//         status: "success",
//         message: "Sesión iniciada con válido",
//         user: user,
//         token: token,
//       });
//     }
//   }
 
//   static async logout(req, res) {
//     req.session.destroy((error) => {
//       if (!error) {
//         res.send("Sesión cerrada");
//       } else {
//         console.log(error);
//         res.send({ status: "error", message: "Sesión no cerrada" });
//       }
//     });
//   }


// }

import { userModel } from "../models/userModel.js";
import { comparePassword } from "../utils/utils.js";
import { generateToken } from "../utils/auth.js";

export class loginController {
  static async signIn(req, res) {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).populate("roles");

    if (!user) {
      return res.status(404).send({ status: "error", message: "Usuario no encontrado" });
    }

    const isMatch = comparePassword(password, user);
    if (!isMatch) {
      return res.status(401).send({
        status: "error",
        message: "Usuario o contraseña incorrectos",
      });
    }

    // Generar token
    const token = generateToken(user);

    // Configurar cookie con token
    res.cookie("token", token, {
      httpOnly: true, // La cookie no es accesible por JavaScript en el frontend
      secure: process.env.NODE_ENV === "production", // Solo en HTTPS en producción
      sameSite: "strict", // Evita ataques CSRF
      maxAge: 3600000, // Expira en 1 hora
    });

    res.send({
      status: "success",
      message: "Sesión iniciada correctamente",
      user: user,
    });
  }

  static async logout(req, res) {
    res.clearCookie("token"); // Elimina la cookie de sesión
    res.send({ status: "success", message: "Sesión cerrada" });
  }
}
