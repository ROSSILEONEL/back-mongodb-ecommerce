
// import jwt from 'jsonwebtoken';

// export const generateToken = (user) => {
//     const token = jwt.sign(
//         {
//             userId: user._id,
//             email: user.email
//         },
//         process.env.SECRET_KEY,
//         {
//             expiresIn: "2d"
//         }
//     );
//     return token;
// };

// export const verifyToken = (req, res, next) => {
//     const tokenHeader = req.headers.authorization;
//     console.log('tokenHeader -->',tokenHeader);
    
//     const token = tokenHeader.split(" ")[1];
//     console.log('verify -->',token);
   

//     if (!token) {
//         res.send({ status: "error", message: "No token provided" });
//     } else {
//         jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
//             if (err) {
//                 res.send({ status: "error", message: "Failed to authenticate token" });
//             } else {
//                 req.userId = decoded.userId;
//                 req.email = decoded.email;
//                 next();}
//         });
//     }
// };




import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
    return jwt.sign(
        {
            userId: user._id,
            email: user.email
        },
        process.env.SECRET_KEY,
        { expiresIn: "2d" }
    );
};

export const verifyToken = (req, res, next) => {
    const tokenHeader = req.headers.authorization;
    console.log('tokenHeader -->', tokenHeader);

    // Validar que exista el token en el header
    if (!tokenHeader || !tokenHeader.startsWith("Bearer ")) {
        return res.status(401).json({ status: "error", message: "No token provided or invalid format" });
    }

    const token = tokenHeader.split(" ")[1];
    console.log('verify -->', token);

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ status: "error", message: "Failed to authenticate token" });
        }

        // Guardamos la info del usuario en el request
        req.userId = decoded.userId;
        req.email = decoded.email;
        next();
    });
};
