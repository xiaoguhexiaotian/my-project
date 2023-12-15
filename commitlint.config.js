module.exports = {
  ignores: [(commit) => commit.includes('init')],
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [1, 'always'],
    'header-max-length': [2, 'always', 108],
    'subject-empty': [2, 'never'],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能
        'fix', // 修补bug
        'perf', // 优化相关，比如提升性能、体验
        'style', // 代码格式修改, 注意不是 css 修改
        'docs', // 文档修改
        'test', // 测试用例修改
        'refactor', // 重构
        'build', // 编译相关的修改，例如发布版本、对项目构建或者依赖的改动
        'ci', // 持续集成修改
        'chore', // 其他改动
        'revert', // 代码回滚
        'wip', // 表示正在进行中的工作，通常用于标记尚未完成的任务或功能。
        'workflow', // 表示工作流程或流程，指项目中的某个特定步骤或顺序。
        'types', // 表示类型或数据结构，指项目中定义的一些自定义类型或类。
        'release' // 表示发布或版本控制，指将项目部署到生产环境或发布新版本的功能。
      ]
    ]
  }
}
