import { isInteger, isNil } from 'lodash'
const toString = Object.prototype.toString

export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`
}

export function isDef<T = unknown>(val?: T): val is T {
  return typeof val !== 'undefined'
}

export function isUnDef<T = unknown>(val?: T): val is T {
  return !isDef(val)
}

export function isObject(val: any): val is Record<any, any> {
  return val !== null && is(val, 'Object')
}

export function isEmpty<T = unknown>(val: T): val is T {
  if (isArray(val) || isString(val)) {
    return val.length === 0
  }

  if (val instanceof Map || val instanceof Set) {
    return val.size === 0
  }

  if (isObject(val)) {
    return Object.keys(val).length === 0
  }

  return false
}

export function isDate(val: unknown): val is Date {
  return is(val, 'Date')
}

export function isNull(val: unknown): val is null {
  return val === null
}

export function isNullAndUnDef(val: unknown): val is null | undefined {
  return isUnDef(val) && isNull(val)
}

export function isNullOrUnDef(val: unknown): val is null | undefined {
  return isUnDef(val) || isNull(val)
}

export function isNullOrUnDefOrEmpty(val: unknown): val is null | undefined {
  return isUnDef(val) || isNull(val) || isEmpty(val)
}

export function isNumber(val: unknown): val is number {
  return is(val, 'Number')
}

export function isPromise<T = any>(val: any): val is Promise<T> {
  // update-begin--author:sunjianlei---date:20211022---for: 不能既是 Promise 又是 Object --------
  return is(val, 'Promise') && isFunction(val.then) && isFunction(val.catch)
  // update-end--author:sunjianlei---date:20211022---for: 不能既是 Promise 又是 Object --------
}

export function isString(val: unknown): val is string {
  return is(val, 'String')
}

export function isJsonObjectString(val: string): val is string {
  if (!val) {
    return false
  }
  return val.startsWith('{') && val.endsWith('}')
}

export function isFunction(val: unknown): val is Function {
  return typeof val === 'function'
}

export function isBoolean(val: unknown): val is boolean {
  return is(val, 'Boolean')
}

export function isRegExp(val: unknown): val is RegExp {
  return is(val, 'RegExp')
}

export function isArray(val: any): val is Array<any> {
  return val && Array.isArray(val)
}

export function isWindow(val: any): val is Window {
  return typeof window !== 'undefined' && is(val, 'Window')
}

export function isElement(val: unknown): val is Element {
  return isObject(val) && !!val.tagName
}

export function isMap(val: unknown): val is Map<any, any> {
  return is(val, 'Map')
}

export const isServer = typeof window === 'undefined'

export const isClient = !isServer

export function isUrl(path: string): boolean {
  const reg =
    /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/
  return reg.test(path)
}

export function isEmail(email: string): boolean {
  const reg =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return reg.test(email)
}

export function isPhone(phone: string): boolean {
  const reg = /^[1]\d{10}$/
  return reg.test(phone)
}

export function isIdCardNo(idNo: string): boolean {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  return reg.test(idNo)
}

//是否整数
export function isInt(val: any): boolean {
  return !isNaN(val) && isInteger(Number(val))
}

//是否纯数字
export function isPureNumber(val: any): boolean {
  return /^[0-9]*$/.test(val)
}

/**
 * 对象是否包含有效的属性值（包括非空字符串）
 * @param object 对象
 * @param string 属性名
 */
export function isPropertyValid(obj: Object, prop: string) {
  return Reflect.has(obj, prop) && !isNil(obj[prop]) && obj[prop] !== ''
}
