import {
  RecordSource,
  Store
} from 'relay-runtime'

const source = new RecordSource()
export const DefaultStore = new Store(source)
