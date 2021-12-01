const OFF = 0
const WARN = 1
const ERROR = 2

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  globals: {
    document: true,
    localStorage: true,
    VoidFunction: true,
    window: true,
    RecordType: true,
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:unicorn/recommended',
    'plugin:promise/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    '.eslint-config-public.js',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'jsx-a11y', 'unicorn', 'promise', '@typescript-eslint', 'prettier'],
  settings: {
    // 根据扩展名优化文件查找顺序
    'import/resolver': {
      node: {
        extensions: ['.tsx', '.ts', '.js', '.json'],
        moduleDirectory: ['node_modules', 'src/'],
      },
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  rules: {
    // 解决不同扩展名引用报错
    'import/extensions': [
      ERROR,
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
        js: 'never',
      },
    ],
    'import/no-extraneous-dependencies': [ERROR, { devDependencies: true }],
    'import/prefer-default-export': OFF,
    'import/no-unresolved': OFF,
    'unicorn/better-regex': ERROR,
    'unicorn/prevent-abbreviations': OFF,
    'unicorn/filename-case': OFF,
    'unicorn/no-array-reduce': OFF,
    // 'unicorn/filename-case': [
    //   ERROR,
    //   {
    //     cases: {
    //       // 中划线
    //       kebabCase: true,
    //       // 小驼峰
    //       camelCase: true,
    //       // 下划线
    //       snakeCase: false,
    //       // 大驼峰
    //       pascalCase: true
    //     }
    //   }
    // ],
    'unicorn/no-array-instanceof': WARN,
    'unicorn/no-for-loop': WARN, // 使用 for of 和 .entries 代替传统的 for 循环
    'unicorn/prefer-add-event-listener': [
      ERROR,
      {
        excludedPackages: ['koa', 'sax'],
      },
    ],
    'unicorn/prefer-query-selector': OFF,
    'unicorn/no-null': OFF,
    'unicorn/prefer-module': OFF,
    'unicorn/no-object-as-default-parameter': OFF,

    '@typescript-eslint/no-useless-constructor': ERROR,
    '@typescript-eslint/no-empty-function': WARN,
    '@typescript-eslint/no-var-requires': OFF,
    '@typescript-eslint/explicit-function-return-type': OFF,
    '@typescript-eslint/explicit-module-boundary-types': OFF,
    '@typescript-eslint/no-explicit-any': OFF,
    '@typescript-eslint/no-use-before-define': OFF,
    '@typescript-eslint/ban-ts-ignore': OFF,
    '@typescript-eslint/no-non-null-assertion': OFF,

    'react/jsx-filename-extension': [ERROR, { extensions: ['.tsx', 'ts', '.jsx', 'js'] }],
    'react/jsx-indent-props': [ERROR, 2],
    'react/jsx-indent': [ERROR, 2],
    'react/jsx-one-expression-per-line': OFF,
    'react/destructuring-assignment': OFF,
    'react/state-in-constructor': OFF,
    'react/jsx-props-no-spreading': OFF,
    'react/prop-types': OFF,
    'react/jsx-no-undef': OFF,
    'react/no-array-index-key': OFF,
    'react-hooks/exhaustive-deps': WARN,
    'react/require-default-props': OFF,
    'jsx-a11y/click-events-have-key-events': OFF,
    'jsx-a11y/no-noninteractive-element-interactions': OFF,
    'jsx-a11y/no-static-element-interactions': OFF,

    'lines-between-class-members': [ERROR, 'always'],
    indent: [ERROR, 2, { SwitchCase: 1 }],
    'linebreak-style': [ERROR, 'unix'],
    quotes: [ERROR, 'single'],
    semi: [OFF, 'always'],
    'no-unused-expressions': OFF,
    'no-plusplus': OFF,
    'no-console': OFF,
    'class-methods-use-this': ERROR,
    'jsx-quotes': [ERROR, 'prefer-single'],
    'global-require': OFF,
    'no-use-before-define': OFF,
    'no-restricted-syntax': OFF,
    'no-continue': OFF,
    'comma-dangle': [OFF, 'never'],
    'prefer-destructuring': OFF,
    'no-magic-numbers': [
      OFF,
      {
        ignore: [0, -1, 1],
      },
    ],
    'arrow-parens': OFF,
  },
}
