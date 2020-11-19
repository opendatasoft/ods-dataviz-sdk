module.exports = {
  /*
  >> https://github.com/storybookjs/storybook/issues/12754

  webpackFinal: (config) => {
    console.log('config', config);
    const svelteLoader = config.module.rules.find(
      (r) => r.loader && r.loader.includes("svelte-loader"),
    )
    console.log('Svelte loader', svelteLoader)
    svelteLoader.options.preprocess = require("svelte-preprocess")({})
    console.log('svelteLoader.options.preprocess', svelteLoader.options.preprocess)
    return config
  },
  */
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ]
}