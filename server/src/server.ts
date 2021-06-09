import express from "express";
import bodyParser from "body-parser";
import * as http from "http";
import path from "path";
import {config} from "dotenv";
import {routes} from "./routes/_routes";
import {DbDialect} from "./utils/types";
import {ConnectionOptions, createConnection} from "typeorm";

// env
const envPath = path.join(__dirname, "..", ".env");
config({path: envPath});

// express server
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.set("port", (process.env.PORT || 5000));

// static
const staticFiles = express.static(path.join(__dirname, "../../client/build"));
app.use(staticFiles);

// express routes
app.use("/api/accounts", routes.account);

// any routes not picked up by the server api will be handled by the react router
app.use("/*", staticFiles);

// database
const databaseDialect = process.env.DATABASE_DIALECT as DbDialect;
const migrationsDir = path.join(__dirname, "migrations");
export const dbOptions: ConnectionOptions = {
    database: databaseDialect === "sqlite" ? "site.db" : "",
    type: databaseDialect,
    url: process.env.DATABASE_URL,
    entities: [

    ],
    synchronize: false,
    extra: {
        ssl: {
            rejectUnauthorized: false
        }
    },
    migrationsRun: true,
    migrationsTableName: "migrations",
    migrations: [migrationsDir],
    cli: {migrationsDir}
};
createConnection(dbOptions).then(connection => {
    console.log(`Connected to database type: ${connection.options.type}.`);
}).catch(error => console.error(error));

// http server and socket
const server: http.Server = http.createServer(app);

// listen
server.listen(app.get("port"), () => {
    console.log(`Server is listening on port ${app.get("port")}.`);
});
