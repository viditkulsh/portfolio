// config-overrides.js - Override webpack configuration to fix deprecation warnings
const { override, addWebpackModuleRule } = require('customize-cra');

module.exports = override(
  // Override webpack dev server configuration to fix deprecation warnings
  (config, env) => {
    if (env === 'development') {
      // Fix deprecation warnings for onBeforeSetupMiddleware and onAfterSetupMiddleware
      if (config.devServer) {
        // Remove deprecated options if they exist
        delete config.devServer.onBeforeSetupMiddleware;
        delete config.devServer.onAfterSetupMiddleware;
        
        // Use the new setupMiddlewares option
        config.devServer.setupMiddlewares = (middlewares, devServer) => {
          // Before setup middleware logic (if needed)
          // This is where onBeforeSetupMiddleware logic would go
          
          // After setup middleware logic (if needed)  
          // This is where onAfterSetupMiddleware logic would go
          
          return middlewares;
        };
      }
    }
    return config;
  }
);
