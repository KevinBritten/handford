const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    shared_js: "./src/entry-points/shared.js",
    creative_styles: "./src/entry-points/creative.js",
    imaging_styles: "./src/entry-points/imaging.js",
    fonts: "./src/entry-points/fonts.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.html$/i,
        use: "html-loader",
      },
      {
        test: /\.(webp|png)$/,
        type: "asset/resource",
        generator: {
          filename: "images/[name][ext]",
        },
      },
    ],
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: "production", // Use 'development' for development settings
  devServer: {
    static: path.join(__dirname, "dist"), // where dev server will look for static files, not including index.html
    port: 8080, // port to run dev-server on
    open: true, // opens browser on run
    hot: true, // hot module replacement
    compress: true, // Enable gzip compression for everything served
    historyApiFallback: true, // will redirect 404s to /index.html
    //... any other options you want to use
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
    // new HtmlWebpackPlugin({
    //   template: "./src/pages/index.html", // your source html file
    //   filename: "index.html", // output file in 'dist' directory
    // }),
    new HtmlWebpackPlugin({
      template: "./src/pages/handford-creative.html",
      filename: "handford-creative.html",
      excludeChunks: ["fonts"],
      chunks: ["shared_js", "creative_styles"],
    }),
    // new HtmlWebpackPlugin({
    //   template: "./src/pages/handford-imaging.html",
    //   filename: "handford-imaging.html",
    //   chunks: ["shared_js", "imaging_styles"],
    // }),
    // ... other plugins if any ...
  ],
};
