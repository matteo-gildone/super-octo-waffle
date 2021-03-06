const { checkMiddlewareInputs, matchPath } = require("./lib/util");

const _middlewares = [];

const findNext = (req, res) => {
  let current = -1;
  const next = () => {
    current += 1;
    const middleware = _middlewares[current];
    const { matched = false, params = {} } = middleware
      ? matchPath(middleware.path, req.pathname)
      : {};

    if (matched) {
      req.params = params;
      middleware.handler(req, res, next);
    } else if (current <= _middlewares.length) {
      next();
    } else {
      req.handler(req, res);
    }
  };
  return next;
};

const handle = (req, res, cb) => {
  const next = findNext(req, res);
  req.handler = cb;
  next();
};

const use = (...args) => {
  const { path, handler } = checkMiddlewareInputs(args);
  _middlewares.push({
    path,
    handler,
  });
};

module.exports = {
  handle,
  use,
};
