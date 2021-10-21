module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['airbnb-base', 'airbnb-typescript/base', 'prettier'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json',
        extraFileExtensions: ['.svelte'],
    },
    plugins: ['svelte3', '@typescript-eslint'],
    overrides: [
        {
            files: ['*.svelte'],
            processor: 'svelte3/svelte3',
            rules: {
                // Allowed in svelte
                'import/first': 'off',
                'import/no-mutable-exports': 'off',
            },
        },
    ],
    settings: {
        'svelte3/typescript': true,
    },
    rules: {
        'class-methods-use-this': 'off', // False positives with abstract methods
        'import/prefer-default-export': 'off',
    },
};
