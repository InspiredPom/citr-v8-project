import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import renderApp from "./dist/server/ServerApp.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

//this is whatever directory we are in ^^

const PORT = process.env.PORT || 3001;
//for conventions sake ^^

const html = fs
  .readFileSync(path.resolve(__dirname, "./dist/client/index.html"))
  .toString();
  //we need all the proper paths for these thing to javascript

const parts = html.split("not rendered");
//its in the indexhtml as root

const app = express();

app.use(
  "/assets",
  express.static(path.resolve(__dirname, "./dist/client/assets"))
);
//this is serving static assets ^^
app.use((req, res) => {
  res.write(parts[0]);
  //this fleshes the header first^^
  const stream = renderApp(req.url, {
    //this grabs server
    onShellReady() {
      //if it is the crawler,do nothing here
      stream.pipe(res);
      //pipe is response object and react stream working together

    },
    onShellError() {
      // do error handling
    },
    onAllReady() {
      res.write(parts[1]);
      res.end();
      //if it is the crawler - stream.pipe(res)
    },
    onError(err) {
      console.error(err);
    },
  });
});

console.log(`listening on http://localhost:${PORT}`);
app.listen(PORT);