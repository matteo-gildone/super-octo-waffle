const Layer = require("./layer.js");

const Route = (path) => {
  const stack = [];
  const methods = {};
  return {
    requestHandler(method) {
      const name = method.toLowerCase();
      return Boolean(methods[name]);
    },
    get(handler) {
      const layer = Layer("/", handler);
      layer.method = "get";

      methods["get"] = true;
      stack.push(layer);
      return this;
    },
    dispatch(req, res) {
      const method = req.method.toLowerCase();
      stack.forEach((item) => {
        if (method === item.method) {
          item.requestHandler(req, res);
        }
      });
    },
  };
};

module.exports = Route;
