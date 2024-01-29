module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'airbnb',
        'airbnb/hooks',
        'airbnb-typescript',
        'prettier',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
        ecmaFeatures: {
            jsx: true,
        },
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    plugins: ['@typescript-eslint', 'prettier', 'react', 'no-only-tests'],
    globals: {
        jest: true,
    },
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
        'import/no-extraneous-dependencies': [
            'error',
            { devDependencies: ['./test/**', './stories**'] },
        ],
        'no-underscore-dangle': 0,
        'react/jsx-one-expression-per-line': 0,
        'arrow-parens': [2, 'as-needed'],
        'react/jsx-props-no-spreading': 0,
        'jsx-a11y/label-has-for': 0,
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'object-curly-newline': [
            'error',
            {
                ObjectExpression: { minProperties: 6, multiline: true, consistent: true },
                ObjectPattern: { minProperties: 6, multiline: true, consistent: true },
            },
        ],
        'react/jsx-filename-extension': [2, { extensions: ['.jsx', '.tsx'] }],
        'react/react-in-jsx-scope': 'off',
        'import/no-named-as-default': 'off',
        // FIXME: With the introduction of TS, these rules cause linter errors (many of them quite justified). For the
        // ... moment, they have been disabled but in the future we could re-enable them and fix the different errors.
        '@typescript-eslint/naming-convention': 'off',
        '@typescript-eslint/default-param-last': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        // avoid the usage of test.only
        'no-only-tests/no-only-tests': 'error',
        'react/function-component-definition': [
            0,
            {
                namedComponents: ['function-expression', 'arrow-function'],
                unnamedComponents: 'arrow-function',
            },
        ],
    },
};
