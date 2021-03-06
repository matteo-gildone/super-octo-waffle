exports.constCase = (str) => {
  return str.toUpperCase().replace(/["']/g, "").replace(" ", "_");
};

exports.checkMiddlewareInputs = (args) => {
  let path = "*";
  let handler = null;

  if (args.length === 2) {
    [path, handler] = args;
  } else {
    handler = args[0];
  }

  if (typeof path !== "string") {
    throw new Error("Path needs to be a string");
  } else if (typeof handler !== "function") {
    throw new Error("Middleware needs to be a function");
  }

  return {
    path,
    handler,
  };
};

exports.matchPath = (setupPath, currentPath) => {
  const setupPathArray = setupPath.split("/");
  const currentPathArray = currentPath.split("/");
  const setupArrayLength = setupPathArray.length;

  let match = true;
  let params = {};

  for (let i = 0; i < setupArrayLength; i++) {
    let route = setupPathArray[i];
    let path = currentPathArray[i];
    if (route[0] === ":") {
      params[route.substr(1)] = path;
    } else if (route === "*") {
      break;
    } else if (route !== path) {
      match = false;
      break;
    }
  }

  return match ? { matched: true, params } : { matched: false };
};
