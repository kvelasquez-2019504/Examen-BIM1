'use strict'

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
import  userRoutes  from '../src/users/user.routes.js';
import loginRoutes from '../src/auth/auth.routes.js';
import productRoutes from '../src/products/product.routes.js';
import categoryRoutes from '../src/categories/category.routes.js';

class Server {
    constructor(){
        this.app = express();
        this.port= process.env.PORT;
        this.userPath = '/marketOnline/v1/users';
        this.loginPath = '/marketOnline/v1/login';
        this.productPath= '/marketOnline/v1/products';
        this.categoryPath= '/marketOnline/v1/categories';
        this.middlewares();
        this.conectarDB();
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
    }

    routes(){
        this.app.use(this.userPath, userRoutes);
        this.app.use(this.loginPath, loginRoutes);
        this.app.use(this.productPath, productRoutes);
        this.app.use(this.categoryPath,categoryRoutes);
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Sever running on port '+this.port);
        })
    }
}

export default Server;