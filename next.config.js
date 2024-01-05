/** @type {import('next').NextConfig} */
module.exports = {
    webpack: (config, { isServer }) => {
      config.module.rules.push({
        test: /\.(glsl|frag|vert)$/,
        exclude: /node_modules/,
        use: ['raw-loader'],
      });
  
      return config;
    },
  };
