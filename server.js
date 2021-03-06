const fs = require("fs");
const path = require("path");
const { PORT } = require("./config");
const app = require("./src/app");
const { statusCode, statusMessage } = require("./src/status");
const server = app();

// server.use((req, res, next) => {
//   console.log("\x1b[33m%s\x1b[0m", "----------------");
//   return next();
// });

// server.use((req, res, next) => {
//   console.log(Object.keys(req));
//   console.log(Object.keys(res));
//   return next();
// });

// server.use((req, res, next) => {
//   console.log("\x1b[33m%s\x1b[0m", "----------------");
//   return next();
// });

server.get("/about", (req, res) => {
  res.send("I am the about page");
});

server.get("/", (req, res) => {
  fs.readFile(path.resolve(__dirname, "public", "index.html"), (err, data) => {
    if (err) {
      return res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(statusMessage.INTERNAL_SERVER_ERROR);
    }
    return res.status(statusCode.OK).send(data);
  });
});

server.listen(
  PORT,
  console.log("\x1b[36m%s\x1b[0m", `Server running on ${PORT}`)
);
