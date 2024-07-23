import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
    try {
        let token = req.header("Authotization");

        if (!token){
            return res.status(403).send("Access Denied");
        }

        if (token.StartsWith("Bearer ")){
            token = token.slice(7, token.lenght).trimleft();
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.ser = verified;

    }   catch (err) {
        res.status(500).json({ error: err.message })
    }
}