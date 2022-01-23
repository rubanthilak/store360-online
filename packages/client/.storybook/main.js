const path = require("path")

path.resolve(__dirname, '../src/components')

module.exports = {
  core: {
    builder: 'storybook-builder-vite',
  },
  async viteFinal(config, { configType }) {
    // customize the Vite config here
    const svgrPlugin = require('vite-plugin-svgr')
    config.plugins = [
      ...config.plugins,
      svgrPlugin({
        svgrOptions: {
          icon: true,
          // ...svgr options (https://react-svgr.com/docs/options/)
        },
      })
    ]
    config.resolve.alias = [
      {
        find: "@/",
        replacement: path.resolve(__dirname, "../src"),
      },
      {
        find: "@/assets",
        replacement: path.resolve(__dirname, "../src/assets"),
      },
      {
        find: "@/hooks",
        replacement: path.resolve(__dirname, "../src/hooks"),
      },
      {
        find: "@/components",
        replacement: path.resolve(__dirname, "../src/components"),
      },
    ];
    // return the customized config
    return config;
  },
  features: {
    storyStoreV7: true,
  },
  stories: [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.jsx"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-postcss"
  ],
  framework: "@storybook/react"
}