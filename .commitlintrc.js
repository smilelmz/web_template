module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'style',
        'format',
        'docs',
        'perf',
        'init',
        'test',
        'refactor',
        'patch',
        'file',
        'publish',
        'tag',
        'config',
        'git',
        'build',
        'ci',
        'chore',
        'revert',
        'anno',
      ],
    ],
    'subject-case': [2, 'always', ['lower-case', 'camel-case', 'pascal-case', 'kebab-case']],
  },
}
/**
 * feat: 引入新功能
 * fix: 修复bug
 * style: 代码格式改变
 * format: 格式化代码
 * docs: 更新/添加文档
 * perf: 提高性能/优化
 * init: 初次提交代码/初始化项目
 * test: 增加测试代码
 * refactor: 改进代码结构/代码格式
 * patch: 添加重要补丁
 * file: 添加新文件
 * publish: 发布新版本
 * tag: 发布版本/添加新标签
 * config: 修改配置文件
 * git: 添加或修改.gitignore文件
 * build: 改变了build工具 如 webpack
 * ci: 持续集成新增
 * chore: 构建过程或辅助工具的变动
 * revert: 撤销上一次的 commit
 * anno: 增加注释
 */
