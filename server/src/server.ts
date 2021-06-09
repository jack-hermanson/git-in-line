import express from "express";
import bodyParser from "body-parser";
import * as http from "http";
import path from "path";
import {config} from "dotenv";
import {routers} from "./routes/_routers";

// env
const envPath = path.join(__dirname, "..", ".env");
config({path: envPath});
console.log(process.env.NAME);

// express server
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.set("port", (process.env.PORT || 5000));

// static
const staticFiles = express.static(path.join(__dirname, "../../client/build"));
app.use(staticFiles);

// express routes
app.use("/api/accounts", routers.account);

// any routes not picked up by the server api will be handled by the react router
app.use("/*", staticFiles);

// database

// http server and socket
const server: http.Server = http.createServer(app);

// listen
server.listen(app.get("port"), () => {
    console.log(`Server is listening on port ${app.get("port")}.`);
});
