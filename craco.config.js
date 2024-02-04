const path = require("path");

module.exports = {
  // webpack配置
  webpack: {
    // 配置别名
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@router": path.resolve(__dirname, "src/router"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@store": path.resolve(__dirname, "src/store"),
    },
  },
};
