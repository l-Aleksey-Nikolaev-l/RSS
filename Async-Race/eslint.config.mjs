import globals from 'globals';
import tseslint from 'typescript-eslint';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';

export default [
    {
        files: ['**/*.{js,mjs,cjs,ts}'],
    },
    {
        linterOptions: {
            noInlineConfig: true,
            reportUnusedDisableDirectives: "error"
        },

        plugins: {
            unicorn: eslintPluginUnicorn,
        },

        rules: {
            'unicorn/better-regex': 'error',
            'no-debugger': 'off',
            'no-console': 0,
            "@typescript-eslint/member-ordering": "error",
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/no-unused-vars': ['error', {
                'vars': 'all',
                'args': 'all',
                'caughtErrors': 'all',
            }],
            "@typescript-eslint/consistent-type-assertions": [
                "error",
                { "assertionStyle": "never" }
            ],
            "@typescript-eslint/consistent-type-imports": "error",
            "@typescript-eslint/explicit-function-return-type": "error",
            "@typescript-eslint/explicit-member-accessibility": [
                "error",
                { "accessibility": "explicit", "overrides": { "constructors": "off" } }
            ],
        },
    },
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.builtin,
            },
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    ...tseslint.configs.recommended,
    eslintPluginPrettier
];