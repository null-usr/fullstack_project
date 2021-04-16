import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../models/product';
import { verifyAuthToken } from '../jwt_middleware';

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
    try {
        const products = await store.index();
        res.json(products);
    } catch (err) {
        res.status(500).json(err);
    }
};

const show = async (req: Request, res: Response) => {
    try {
        const product = await store.show(parseInt(req.params.id));
        res.json(product);
    } catch (err) {
        res.status(400).json(err);
    }
};

const create = async (req: Request, res: Response) => {
    try {
        const product: Product = {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
            url: req.body.url,
            description: req.body.description,
        };

        const newproduct = await store.create(product);
        res.json(newproduct);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const destroy = async (req: Request, res: Response) => {
    try {
        const product = await store.delete(req.params.id);
        res.json(product);
    } catch (err) {
        res.status(400).json(err);
    }
};

const product_routes = (app: express.Application): void => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', verifyAuthToken, create);
    app.delete('/products/:id', destroy);
};

export default product_routes;
