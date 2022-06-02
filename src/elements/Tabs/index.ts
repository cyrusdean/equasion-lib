// Basics types to build off of
export type KeyValue = string | number
export type ContentValue = HTMLElement | KeyValue

// Used when the key doubles as the label - can be used with primitive types
type KeyContentObject = {
  [key: KeyValue]: ContentValue
}
// used when the key doubles as the label but want to save lines
export type KeyContentTuple = [key: KeyValue, content: ContentValue]
type KeyLabelContentTuple = [
  key: KeyValue,
  label: ContentValue,
  content: ContentValue
]

// Most verbose option explicitly definining key, label, and content
export type KeyLabelContent = {
  key: KeyValue
  label: ContentValue
  content: ContentValue
}

/*
  Valid data input formats:
  A) { [ key : KeyValue ] : ContentValue }  // KeyContentObject
  B) [ [ key : KeyValue, label : ContentValue, content : ContentValue ] ] // Array<KeyLabelContentTuple>
  C) [ [ key : KeyValue, content : ContentValue ] ] // Array<KeyContentTuple>
  D) [ { key : KeyValue, label: ContentValue, content: ContentValue } ] // Array<KeyLabelContent>
*/

export type TabsDataOptions =
  | KeyContentObject
  | Array<KeyLabelContentTuple>
  | Array<KeyContentTuple>
  | Array<KeyLabelContent>

export interface TabsProps {
  data: TabsDataOptions
  selectedKey?: KeyValue
  disabledKeys?: Array<KeyValue>
  menuOnly?: boolean
  vertical?: boolean
  onTabChange?: (key: KeyValue) => void
}

export { default } from './Tabs'
