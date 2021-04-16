import express, { Request, Response } from 'express';
import { /*Order, Orders, */ OrderStore } from '../models/order';
import { verifyAuthToken } from '../jwt_middleware';

const store = new OrderStore();

const current_order = async (req: Request, res: Response) => {
    try {
        const orders = await store.getUserOrder(parseInt(req.params.id));
        res.json(orders);
    } catch (err) {
        res.status(400).json(err);
    }
};

const order_routes = (app: express.Application): void => {
    app.get('/orders/:id', verifyAuthToken, current_order);
};

export default order_routes;
