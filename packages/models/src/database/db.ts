import * as Mongoose from "mongoose";
import { EntityModel } from "../entities/entities.model"

// TODO: create mongodb with Dockerfile / docker-compose
// TODO: dotenv mongodb connection

let database: Mongoose.Connection;
export const connect = () => {

    const uri = "mongodb+srv://localhost/test?retryWrites=true&w=majority";  
    if (database) {
        return;
    }

    Mongoose.connect(uri, {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    });

    database = Mongoose.connection;
    database.once("open", async () => {
        console.log("Connected to database");
    });

    database.on("error", () => {
        console.log("Error connecting to database");
    });
};

export const disconnect = () => {
    if (!database) {
        return;
    }
    Mongoose.disconnect();
};