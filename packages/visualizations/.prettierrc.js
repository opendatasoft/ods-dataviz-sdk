module.exports = {
    plugins: ['prettier-plugin-svelte'],
    overrides: [{ files: '*.svelte', options: { parser: 'svelte' } }],
    svelteIndentScriptAndStyle: true,
    printWidth: 100,
    tabWidth: 4,
    semi: true,
    singleQuote: true,
    trailingComma: 'es5',
    arrowParens: 'always',
};
