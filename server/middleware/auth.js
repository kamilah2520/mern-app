import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
    try {
        let token = req.header("Authotization");

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}