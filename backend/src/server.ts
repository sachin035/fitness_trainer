import express from "express";

import serverConfig from "./config";
import routes from "./routes/auth";
import { genericErrorHandler, notFoundError } from "./middleware/errorHandler";

const app = express();

app.use(express.json());

app.use(routes);

app.use(genericErrorHandler);

app.use(notFoundError);

// const port: string | number = process.env.SERVER_PORT || 3000;
app.listen(serverConfig.serverPort, () => {
  console.log(`Server is listening at port ${serverConfig.serverPort}`);
});
