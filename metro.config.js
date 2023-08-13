// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");

const MetroConfig = require("@ui-kitten/metro-config");

const evaConfig = {
  evaPackage: "@eva-design/eva",
  // Optional, but may be useful when using mapping customization feature.
  // customMappingPath: './custom-mapping.json',
};

module.exports = async () => {
  /** @type {import('expo/metro-config').MetroConfig} */
  const defaultConfig = await getDefaultConfig(__dirname);
  defaultConfig.resolver.sourceExts.push("cjs", "mjs");
  return MetroConfig.create(evaConfig, defaultConfig);
};
