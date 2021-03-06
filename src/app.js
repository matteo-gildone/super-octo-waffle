const http = require("http");
const request = require("./request");
const response = require("./response");
const { use, handle } = require("./middlewares");
const { checkMiddlewareInputs } = require("./lib/util");
const Router = require("./router/index");

const App = () => {
  const _router = Router();
  return {
    get(...args) {
      const { path, handler } = checkMiddlewareInputs(args);
      return _router.get(path, handler);
    },
    use,
    listen: (port = 8080, cb) => {
      return http
        .createServer((req, res) => {
          request(req);
          response(res);
          handle(req, res, () => _router.handle(req, res));
        })
        .listen({ port }, () => {
          if (cb) {
            if (typeof cb === "function") {
              return cb();
            }
            throw new Error("Listen callback needs to be a function");
          }
        });
    },
  };
};

module.exports = App;
