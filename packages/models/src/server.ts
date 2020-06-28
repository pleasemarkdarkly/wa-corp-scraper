import * as express from "express";
import { connect } from "./database/db";

// TODO: dotenv for PORT

const app = express();
const port = 5010;

connect();

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});