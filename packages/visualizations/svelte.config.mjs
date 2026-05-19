import autoPreprocess from 'svelte-preprocess';

export default {
    preprocess: autoPreprocess({
        scss: {
            includePaths: ['src'],
        },
    }),
};
