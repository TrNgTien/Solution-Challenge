import { IRouter, IServer } from "../../../interface/low-level/interface";

import { Application } from 'express';
import { Server } from 'http';
import { Config } from "../../type";

import express from "express";
import bodyParser from 'body-parser'
import cors from 'cors'
import {scopePerRequest} from 'awilix-express'
import { container } from "../../../container";

export default class ExpressServer implements IServer{
    private express : Application;
    private server : Server;
    constructor(private config : Config , router : IRouter) {
        this.express = express();
                
        this.express.use(bodyParser.json({ limit: '5000mb' }));
        this.express.use(bodyParser.urlencoded({ limit: '5000mb', extended: true }));
        this.express.use(scopePerRequest(container))
        this.express.use(express.urlencoded());
        this.express.use(express.json());
        this.express.use(cors())

        this.express.use(router.route());
    }
    start(): Promise<void> {
        const PORT = this.config.http.port;

        return new Promise(resolve => {
            this.express.listen(PORT , () => {
                console.log(`Server is listening on port ${PORT}`)
                resolve();
            })
        })
    }
    stop(): Promise<void> {
        return new Promise(resolve => {
            console.log(`Server is closed`);
            this.server.close(() => {
                resolve();
            });
        })
    }
}