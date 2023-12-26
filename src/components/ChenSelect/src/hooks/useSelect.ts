import { ChenSelectProps } from '../types/type'
export const useSelect = (_props: ChenSelectProps, _emit) => {
  const change = (value: string | string[], option: any) => {
    if (_props.mode === 'combobox') {
      const detail = _props.options.find((i) => i.value === value)
      _emit('change', value, detail)
      _emit('update:value', value, detail)
    }
  }
  return { change }
}
