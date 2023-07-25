const path = require('node:path');

// Not transpiled with TypeScript or Babel, so use plain Es6/Node.js!
module.exports = {
  // This function will run for each entry/format/env combination
  rollup(config, options) {
    if (options.format === 'esm') {
      const outputFile = path.join(__dirname, 'dist', `${options.name}.mjs`);

      return {
        ...config,
        output: {
          ...config.output,
          file: outputFile,
        },
      };
    }

    return config;
  },
};
