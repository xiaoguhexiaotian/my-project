import { Button, Input, Select } from 'ant-design-vue'
import { QuestionOutlined, WarningOutlined } from '@ant-design/icons-vue'

const InputDom = (_this) => {
  // Dom结构需要处理的事件，直接拿到整个class内部的属性进行操作
  function search() {
    console.log('调用search事件', _this)
    _this.privateMethod()
  }
  // 一些会对值进行操作的Dom元素，需要在calss内部维护值的变化
  function change(e: any) {
    _this.refData.value.keyWords = e
  }
  return () => (
    <Input
      // v-model:value={_this.refData.value.keyWords}
      placeholder={'change事件双向绑定'}
      style={'width: 148px;border-radius: 2px 2px 2px 2px;padding: 0;margin-right: 8px;'}
      onPressEnter={() => search()}
      onChange={(e) => change(e.target.value)}
    />
  )
}

const OkButtonDom = (_this) => {
  function handleOk() {
    console.log('保存', _this.refData.value)
  }
  return () => (
    <Button
      style={'width: 88px;border-radius: 2px 2px 2px 2px;padding: 0;margin-right: 8px;'}
      type="primary"
      onClick={() => handleOk()}
    >
      确认
    </Button>
  )
}

const SelectDom = (_this) => {
  return () => (
    <Select
      v-model:value={_this.refData.value.selectId}
      allowClear={_this.refData.value.allowClear}
      options={_this.selectOptions}
      style={'width: 148px;border-radius: 2px 2px 2px 2px;padding: 0;margin-right: 8px;'}
    >
      {{
        //  自定义的多选框清除图标插槽
        clearIcon: () => (
          <div>
            <QuestionOutlined />
          </div>
        ),
        //  自定义的选择框后缀图标插槽
        suffixIcon: () => (
          <div>
            <WarningOutlined />
          </div>
        )
      }}
    </Select>
  )
}

export default {
  InputDom,
  OkButtonDom,
  SelectDom
}
