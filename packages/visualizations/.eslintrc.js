module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'airbnb-base',
        'airbnb-typescript/base',
        'prettier',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json',
        extraFileExtensions: ['.svelte'],
        tsconfigRootDir: __dirname,
    },
    plugins: ['svelte3', '@typescript-eslint', 'prettier'],
    overrides: [
        {
            files: ['*.svelte'],
            processor: 'svelte3/svelte3',
            settings: {
                'import/core-modules': ['svelte'],
            },
            rules: {
                // Allowed in svelte
                'import/first': 'off',
                'import/no-mutable-exports': 'off',
                'import/prefer-default-export': 'off',
            },
        },
    ],
    settings: {
        'svelte3/typescript': true,
    },
    rules: {
        'max-len': [
            'error',
            {
                code: 120,
                tabWidth: 4,
                ignoreStrings: true,
                ignoreTemplateLiterals: true,
                ignoreComments: true,
            },
        ],
        camelcase: 0,
        'no-plusplus': 0,
        // disallow reassignment of function parameters
        // disallow parameter object manipulation except for specific exclusions
        'no-param-reassign': [
            'error',
            {
                props: true,
                ignorePropertyModificationsFor: [
                    'acc', // for reduce accumulators
                    'e', // for e.returnvalue
                ],
            },
        ],
        'object-curly-newline': [
            'error',
            {
                ObjectExpression: {
                    minProperties: 6,
                    multiline: true,
                    consistent: true,
                },
                ObjectPattern: {
                    minProperties: 6,
                    multiline: true,
                    consistent: true,
                },
            },
        ],
        'import/no-named-as-default': 'off',
        'class-methods-use-this': 'off', // False positives with abstract methods
    },
};
