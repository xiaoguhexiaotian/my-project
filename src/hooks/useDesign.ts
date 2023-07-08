export function useDesign(scope: string) {
  const values = {
    prefixCls: 'jian-hong'
  }
  return {
    /**
     * 类名前缀拼接
     */
    prefixCls: `${values.prefixCls}-${scope}`,
    /**
     * 类名前缀
     */
    prefixVar: values.prefixCls
  }
}
