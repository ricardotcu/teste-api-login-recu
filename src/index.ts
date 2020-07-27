import "reflect-metadata";
import {createConnection} from "typeorm";
import express from 'express';
import * as dotenv from 'dotenv';
import * as bodyParser from "body-parser";
import routes from "./routes";

const app = express();
dotenv.config();
createConnection();

app.use(bodyParser.json());
app.use(routes);


app.listen(process.env.PORT || 3333);