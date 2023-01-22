const PreloadWebpackPlugin = require("preload-webpack-plugin");
module.exports = function override(config, env) {
  config.plugins.push(
    new PreloadWebpackPlugin({
      rel: "preload",
      as: "font",
      include: "allAssets",
      fileWhitelist: [/(.woff?)/i],
    })
  );

  return config;
};

//build된 index.html파일에 font파일을 preload할 수 있게 설정하는 작업
