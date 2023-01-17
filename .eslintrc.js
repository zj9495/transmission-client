const { resolve } = require;

const OFF = 0;
const ERROR = 2;

module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true,
    },
    extends: [
        'airbnb',
        'airbnb/hooks',
        'plugin:eslint-comments/recommended',
        'plugin:import/typescript',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:unicorn/recommended',
        'plugin:promise/recommended',
        'prettier',
        'prettier/react',
        'prettier/@typescript-eslint',
        'plugin:cypress/recommended'
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    settings: {
        'import/resolver': {
            node: {
                // import 模块时，不写后缀将尝试导入的后缀，出现频率高的文件类型放前面
                extensions: ['.tsx', '.ts', '.js', '.json'],
            },
            typescript: {
                directory: [resolve('./tsconfig.json')],
            },
        },
    },
    plugins: ['react', '@typescript-eslint', 'unicorn', 'promise', 'mui-unused-classes'],
    rules: {
        'eslint-comments/disable-enable-pair': [ERROR, { allowWholeFile: true }],

        'import/extensions': [
            OFF,
            'ignorePackages',
            {
                ts: 'never',
                tsx: 'never',
                json: 'never',
                js: 'never',
            },
        ],

        'unicorn/filename-case': [
            OFF,
            {
                cases: {
                    // 中划线
                    kebabCase: false,
                    // 小驼峰
                    camelCase: true,
                    // 下划线
                    snakeCase: false,
                    // 大驼峰
                    pascalCase: true,
                },
            },
        ],
        'unicorn/import-style': OFF,
        'unicorn/no-null': OFF,
        'unicorn/prevent-abbreviations': OFF,
        'unicorn/no-process-exit': OFF,

        '@typescript-eslint/explicit-function-return-type': OFF,
        '@typescript-eslint/no-explicit-any': OFF,
        '@typescript-eslint/no-non-null-assertion': OFF,
        '@typescript-eslint/no-use-before-define': ERROR,
        '@typescript-eslint/no-useless-constructor': ERROR,
        '@typescript-eslint/explicit-module-boundary-types': OFF,
        '@typescript-eslint/no-unused-vars': ERROR,

        'react/jsx-filename-extension': [ERROR, { extensions: ['.tsx', 'jsx'] }],
        'react/require-default-props': OFF,
        'react-hooks/exhaustive-deps': OFF,
        'react/jsx-props-no-spreading': OFF,
        'react-hooks/rules-of-hooks': OFF,
        'react/destructuring-assignment': OFF,

        'func-names': OFF,
        'lines-between-class-members': OFF,
        'max-classes-per-file': OFF,
        'no-console': OFF,
        'no-empty': OFF,
        'no-param-reassign': OFF,
        'no-plusplus': OFF,
        'no-underscore-dangle': OFF,
        'no-unused-expressions': OFF,
        'no-use-before-define': OFF,
        'no-useless-constructor': OFF,
        'import/prefer-default-export': OFF,
        'unicorn/no-abusive-eslint-disable': OFF,
        'eslint-comments/no-unlimited-disable': OFF,
        'import/no-extraneous-dependencies': [ERROR, { 'devDependencies': ['**/*.test.js', '**/*.spec.js'] }],
        'promise/always-return': OFF,
        'promise/catch-or-return': OFF,
        'unicorn/consistent-function-scoping': OFF,
        'no-shadow': OFF
    },
    overrides: [
        {
            files: ['**/*.d.ts'],
            rules: {
                'import/no-duplicates': OFF,
            },
        },
        {
            files: ['scripts/**/*.ts'],
            rules: {
                'import/no-extraneous-dependencies': OFF,
            },
        },
    ],
};