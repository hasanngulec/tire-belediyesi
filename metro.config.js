const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add resolver for URL polyfill
config.resolver.alias = {
  ...config.resolver.alias,
  'react-native-url-polyfill/auto': require.resolve('react-native-url-polyfill/auto.js'),
};

module.exports = config; 