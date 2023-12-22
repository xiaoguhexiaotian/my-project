import { ref } from 'vue'
import { DBParam, DatabaseEvent } from './type'
import { cloneDeep } from 'lodash'

export const useIndexedDB = (dbOption: DBParam) => {
  const { databaseName, tableName, key, index, indexOptions } = dbOption
  const db = ref<IDBDatabase>()
  const result = ref({ code: 200}) // 返回参数
  const request = indexedDB.open(databaseName)
  request.onerror = function () {
    console.error('打开数据库失败')
  }
  request.onsuccess = function (event: DatabaseEvent) {
    db.value = event.target?.result
    console.log('打开数据库成功')
  }
  request.onupgradeneeded = function (event: any) {
    db.value = event.target?.result
    const objectStore = db.value!.createObjectStore(tableName, { keyPath: key })
    objectStore.createIndex(index, index, indexOptions)
    console.log('数据库实例', objectStore)
  }
  const createObjectStore = (actionCode) => {
    const transaction = db.value!.transaction([tableName], actionCode) // 创建事务
    const objectStore = transaction.objectStore(tableName) // 获取对象存储实例
    return objectStore
  }

  const success = (event:any,message:string)=>{
    result.value = Object.assign(result.value, {
      success: event.type ==='success',
      code: 200,
      message,  
      result: event.target.result
    })
  }
  
  const error = (event:any,message:string)=>{
    result.value = Object.assign(result.value, {
      success: false,
      code: 500,
      message,
      result: event.target.result
    })
  }

  const addData = (data, actionCode: IDBTransactionMode = 'readwrite') => {
    const objectStore = createObjectStore(actionCode)
    const request = objectStore.add(data) // 回调
    // 监听请求结果
    request.onsuccess = function (event: any) {
      success(event,'添加成功')
    }
    request.onerror = function (event:any) {
      error(event,'添加失败')
    }
    return new Promise((resolve) => {
      resolve(cloneDeep(result.value))
    })
  }

  const deleteData = (key: string, actionCode: IDBTransactionMode = 'readwrite') => {
    const objectStore = createObjectStore(actionCode)
    const request = objectStore.delete(key)
    // 监听请求结果
    request.onsuccess = function (event: any) {
      success(event,'删除成功')
    }
    request.onerror = function (event: any) {
      error(event,'删除失败')
    }
    return new Promise((resolve) => {
      resolve(cloneDeep(result.value))
    })
  }

  const queryData = (key: string, keyPath: string, actionCode: IDBTransactionMode = 'readonly') => {
    const objectStore = createObjectStore(actionCode)
    const index = objectStore.index(keyPath)
    index.get(key).onsuccess = (event: any) => {
      success(event,'成功')
    }
    // 查不到不会进onerror
    index.get(key).onerror = (event:any) => {
      error(event, '失败')
    }
    return new Promise((resolve) => {
      resolve(cloneDeep(result.value))
    })
  }

  const editData = (data, actionCode: IDBTransactionMode = 'readwrite') => {
    const objectStore = createObjectStore(actionCode)
    const request = objectStore.put(data) // 回调
    // 监听请求结果
    request.onsuccess = function (event: any) {
      success(event,'修改成功')
    }
    request.onerror = function (event:any) {
      error(event, '修改失败')
    }
    return new Promise((resolve) => {
      resolve(cloneDeep(result.value))
    })
  }

  return { db, addData, deleteData, queryData, editData }
}
