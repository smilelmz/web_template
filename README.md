webpack5 + react + ts + less + antd

```
vs code plugin:
  1、Types auto installer: when use npm install xxx, after auto execute: npm install @types/xxx
  2、Prettier - Code formatter
  3、Eslint
  4、stylelint
  5、EditorConfig For vs Code
```

## loadash

```js
// Lodash es exports the lodash library as an ES module, supports tree shaking based on ES modules, and implements on-demand introduction.
import { throttle } from 'lodash-es' // replace import { throttle } from 'lodash'
```

## husky

```
If the .husky configuration folder is not generated, please run "npm prepare"
```

## bem helper 样式工具类

```
const [bem] = createNamespace('button')
bem() // 'button'
bem('text') // 'button__text'
bem({ disabled }) // 'button button--disabled'
bem('text', { disabled }) // 'button__text button__text--disabled'
bem(['disabled', 'primary']) // 'button button--disabled button--primary'
```
