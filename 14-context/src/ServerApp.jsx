import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./App";

export default function render(url, opts) {
  const stream = renderToPipeableStream(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
    opts
  );
  return stream;
}
//Now let's make a ServerApp.jsx. We need this file to run through Vite so Node.js can render our app.
//This is code that will run in Node.js once we've told Vite to transpile it. This will create a server-readable stream of React markup that we can send to the user.
