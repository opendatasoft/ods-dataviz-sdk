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
        'plugin:svelte/prettier',
    ],
    settings: {
        'import/resolver': {
            typescript: {},
        },
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json',
        extraFileExtensions: ['.svelte'],
        tsconfigRootDir: __dirname,
    },
    plugins: ['@typescript-eslint', 'prettier', 'import'],
    overrides: [
        {
            files: ['*.svelte'],
            parser: 'svelte-eslint-parser',
            // Parse the `<script>` in `.svelte` as TypeScript by adding the following configuration.
            parserOptions: {
                parser: '@typescript-eslint/parser',
            },
            rules: {
                // Allowed in svelte
                'import/first': 'off',
                'import/no-mutable-exports': 'off',
                'import/prefer-default-export': 'off',
                'import/no-extraneous-dependencies': [
                    'error',
                    {
                        devDependencies: true, // allows importintg from 'svelte'
                    },
                ],
                '@typescript-eslint/no-unused-vars': 'off', // is reinjected inside <script>, but off in template
            },
        },
    ],
    rules: {
        semi: ['error', 'always'],
        '@typescript-eslint/semi': ['error', 'always'],
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
        'import/no-named-as-default': 'off',
        'class-methods-use-this': 'off', // False positives with abstract methods
    },
};
