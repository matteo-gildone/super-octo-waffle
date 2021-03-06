const Layer = require("./layer.js");
const Route = require("./route.js");

const Router = () => {
  const stack = [
    Layer("*", (req, res) => {
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/plain");
      res.end(`Cannot find ${req.url}`);
    }),
  ];
  return {
    handle(req, res) {
      const method = req.method;
      let found = false;

      stack.some((item, index) => {
        if (index === 0) {
          return false;
        }
        const { matched = false, params = {} } = item.match(req.pathname);
        if (matched && item.route && item.route.requestHandler(method)) {
          found = true;
          req.params = params;
          return item.requestHandler(req, res);
        }
      });

      return found ? null : stack[0].requestHandler(req, res);
    },
    route(path) {
      const route = Route(path);
      const layer = Layer(path, (req, res) => route.dispatch(req, res));
      layer.route = route;
      stack.push(layer);

      return route;
    },
    get(path, handler) {
      const route = this.route(path);
      route.get(handler);
      return this;
    },
  };
};

module.exports = Router;
