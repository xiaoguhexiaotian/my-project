export function useDesign(scope: string) {
  const values = {
    prefixCls: 'jian-hong' // 布局样式前缀
  }
  return {
    prefixCls: `${values.prefixCls}-${scope}`,
    prefixVar: values.prefixCls
  }
}
