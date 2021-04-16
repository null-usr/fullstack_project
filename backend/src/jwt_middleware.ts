import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const verifyAuthToken = (
    req: Request,
    res: Response,
    next: () => void | Promise<void>
): void => {
    try {
        console.log("We're here");
        const authorizationHeader = req.headers.authorization;
        if (authorizationHeader) {
            console.log("we're actually in here.");
            const token = authorizationHeader.split(' ')[1];
            /*const decoded = */ jwt.verify(
                token,
                process.env.TOKEN_SECRET as string
            );
            next();
        } else if (req.body.token) {
            const token = req.body.token;
            /*const decoded = */ jwt.verify(
                token,
                process.env.TOKEN_SECRET as string
            );
            next();
        } else {
            throw 'Token not found';
        }
    } catch (error) {
        res.status(401).json(error);
    }
};
