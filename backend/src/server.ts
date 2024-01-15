import express from "express";

import serverConfig from "./config";
import routes from "./routes/index";
import { genericErrorHandler, notFoundError } from "./middleware/errorHandler";
import cors from "cors";
import { string } from "joi";

const app = express();

app.use(express.json({ limit: "10mb" }));

app.use(cors());
app.use(routes);

app.use(genericErrorHandler);

app.use(notFoundError);

// const port: string | number = process.env.SERVER_PORT || 3000;
app.listen(serverConfig.serverPort, () => {
  console.log(`Server is listening at port ${serverConfig.serverPort}`);
});
