const path = require("path");

module.exports = {
  entry: "./src/index.js", // Your main JS file
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"), // Where the final bundle will be placed
  },
  mode: "production", // Use 'development' for development settings
};
