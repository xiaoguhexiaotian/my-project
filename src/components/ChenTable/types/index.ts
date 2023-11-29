import { ExtractPropTypes } from 'vue';
import type { VxeColumnProps } from 'vxe-table/types/column';
import { vxeProps } from '/@/components/ChenTable/BasicTable/src/types/propsData';

// vxeProps是函数 ReturnType返回vxeProps的所有类型 ExtractPropTypes可以提取所有类型 Partial可以理解为给类型加上一个? & { TsOmit : never,TsExtra:string} 可以理解为拓展类型，如果vxeProps中已经存在TsOmit，则会覆盖之前的类型
export type CustomVxeTableProps = Partial<ExtractPropTypes<ReturnType<typeof vxeProps>>> & {
  TsOmit:never,
  TsExtra:string
}

// 自定义拓展VxeColumn 的配置类型
export interface CustomColumns extends VxeColumnProps {
  type?:any;
  name?:string;
}