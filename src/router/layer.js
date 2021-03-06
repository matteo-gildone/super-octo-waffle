const { matchPath } = require("../lib/util");

const Layer = (createPath, handler) => {
  const name = handler.name || "<anonymous>";
  return {
    requestHandler(...args) {
      handler ? handler(...args) : null;
    },
    match(path) {
      return matchPath(createPath, path);
    },
  };
};

module.exports = Layer;
