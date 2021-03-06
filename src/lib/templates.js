const path = require("path");
const fs = require("fs");

const html = String.raw;

function template(strings, ...keys) {
  console.log(strings, ...keys);
  return function (...values) {
    let dict = values[values.length - 1] || {};
    let result = [strings[0]];
    keys.forEach(function (key, i) {
      let value = Number.isInteger(key) ? values[key] : dict[key];
      result.push(value, strings[i + 1]);
    });
    return result.join("");
  };
}

const loadskeleton = (payload) => {
  console.log(path.resolve(__dirname, "../..", "views", "skeleton.js"));

  fs.readFile(
    path.resolve(__dirname, "../..", "views", "skeleton.js"),
    (err, data) => {
      if (err) {
        console.log(err);
        throw new Error("Skeleton not found!");
      }

      const myHTML = template`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>${title}</title>
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, shrink-to-fit=no"
    />
    <!--[if lt IE 9
      ]><script src="js/html5shiv-printshiv.js" media="all"></script
    ><![endif]-->
  </head>
  <body>
    <!-- This is a VERY bare bones version of a HTML5 template! -->
    ${body}
  </body>
</html>`;
      console.log(myHTML({ title: "asdsad", body: "sadad" }));
    }
  );
};

exports.render = (path, payload) => {
  const skeleton = loadskeleton(payload);
};
