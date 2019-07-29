const path=require('path');


module.exports={
  context: path.resolve(__dirname, "public"),
  entry:"./scripts/script.js",
  mode:"development",
  output:{
    path: path.resolve(__dirname,"public","scripts"),
    filename: "bundle.js"
  },
  module: {
       rules: [{
           test: /\.scss$/,
           use: [
             "style-loader",
             "css-loader",
               "sass-loader"
           ]
       }]
   }
};
