import tseslint from 'typescript-eslint';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';

export default [
    {
        ignores: ['dist/', 'node_modules/']
    },
    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                ecmaVersion: 2020,
                sourceType: 'module',
                ecmaFeatures: {
                    jsx: true
                }
            }
        },
        plugins: {
            '@typescript-eslint': tseslint.plugin,
            'react': eslintPluginReact,
            'react-hooks': eslintPluginReactHooks
        },
        settings: {
            react: {
                version: 'detect'
            }
        },
        rules: {
            // ESLint recommended rules
            ...tseslint.configs.recommended.rules,

            // React recommended rules
            ...eslintPluginReact.configs.recommended.rules,

            // React Hooks recommended rules
            ...eslintPluginReactHooks.configs.recommended.rules
        }
    }
];