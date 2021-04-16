"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAuthToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyAuthToken = (req, res, next) => {
    try {
        console.log("We're here");
        const authorizationHeader = req.headers.authorization;
        if (authorizationHeader) {
            console.log("we're actually in here.");
            const token = authorizationHeader.split(' ')[1];
            /*const decoded = */ jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
            next();
        }
        else if (req.body.token) {
            const token = req.body.token;
            /*const decoded = */ jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
            next();
        }
        else {
            throw 'Token not found';
        }
    }
    catch (error) {
        res.status(401).json(error);
    }
};
exports.verifyAuthToken = verifyAuthToken;
