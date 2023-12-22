
export type DBParam = {
  databaseName: string
  tableName: string
  key: string
  index: string
  indexOptions: IDBIndexParameters
}

export type DatabaseEvent = Event & {
  target: { result: IDBDatabase }
}


