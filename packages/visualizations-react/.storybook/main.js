import { dirname, join } from "path";

function getAbsolutePath(value) {
    return dirname(require.resolve(join(value, "package.json")));
}

export default {
    stories: ['../stories/**/*.stories.@(ts|tsx|js|jsx)'],
    addons: [
        getAbsolutePath("@storybook/addon-links"),
        getAbsolutePath("@storybook/addon-essentials"),
        "storybook-addon-rtl"
    ],
    // https://storybook.js.org/docs/react/configure/typescript#mainjs-configuration
    typescript: {
        check: true, // type-check stories during Storybook build
    },
    docs: {
        autodocs: true
    },

    framework: {
        name: getAbsolutePath("@storybook/react-vite"),
        options: {
            root: '../src',
        }
    }
};
