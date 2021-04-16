import express, { Request, Response } from 'express';
//import cors from "cors";
//import bodyParser from 'body-parser'
import user_routes from './handlers/users';
import order_routes from './handlers/orders';
import product_routes from './handlers/products';
import * as dotenv from 'dotenv';

dotenv.config();

const app: express.Application = express();
const port = process.env.PORT || 8080;

//deprecated apparently
//app.use(bodyParser.json());
app.use(express.json());

//if this doesn't work npm i cors, app.use(cors());
//allow CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if (req.method === 'OPTIONS') {
        res.header(
            'Access-Control-Allow-Methods',
            'PUT, POST, PATCH, DELETE, GET'
        );
        return res.status(200).json({});
    }
    next();
});

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!');
});

//our API routes
user_routes(app);
order_routes(app);
product_routes(app);

app.listen(port, function () {
    console.log(`starting app on: ${port}`);
});

export default app;
