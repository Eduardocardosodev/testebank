import express from "express";
import routes from "./routes";
import "dotenv/config";

const app = express();

app.use(express.json());
app.use(routes);

const port = process.env.PORT || 3003;

app.listen(port, () => console.log(`Server running at http:localhost:${port}`));
