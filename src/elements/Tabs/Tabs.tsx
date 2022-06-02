import React, { useEffect, useState } from 'react'
import {
  KeyValue,
  ContentValue,
  KeyLabelContent,
  TabsDataOptions,
  TabsProps,
} from './index'
import './tabs.scss'

// mapping function to normalize data
const mapKeyLabelContent = (
  key: KeyValue,
  label: ContentValue,
  content: ContentValue
) => ({
  key,
  label,
  content,
})

// Validation for tabs
const validateTabsData = (data: any[]) => {
  return (
    Array.isArray(data) &&
    // Every option must be an Array
    (data.every((d) => Array.isArray(d)) ||
      // Or an array of objects that are not arrays or null
      data.every(
        (d) => typeof d === 'object' && !Array.isArray(d) && d !== null
      ))
  )
}

// Normalized data takes the structure of an array of objects {key,label,content} - option D
const normalizeData = (
  data: TabsDataOptions,
  menuOnly: boolean
): Array<KeyLabelContent> => {
  const ERR_MSG =
    'Invalid value for data property. Valid options described by TabsDataOptions'
  // Dealing with an array of something
  if (Array.isArray(data)) {
    if (!validateTabsData(data)) {
      throw new Error(ERR_MSG)
    }
    // One of the array options
    const [dataPoint] = data
    // Array of arrays
    if (dataPoint && Array.isArray(dataPoint)) {
      return data.map((dp) => {
        const [key, contentOrLabel, content] = dp

        return mapKeyLabelContent(
          key,
          // For the menu only then the 2nd position is the menu label
          menuOnly || content ? contentOrLabel : key,
          content || contentOrLabel
        )
      })
      // It's an array of normalized objects
    } else {
      // its a normalized dataset which includes empty array
      // typecast the array to one of KeyLabelContent[]
      return data.map((dp) => {
        const { key, label, content } = dp
        return mapKeyLabelContent(key, label, content)
      })
    }
  }
  // Is a KeyContentObject
  else if (typeof data === 'object' && data !== null) {
    return Object.entries(data).map(([key, content]) => {
      return mapKeyLabelContent(key, menuOnly ? content : key, content)
    })
  } else {
    throw new Error(ERR_MSG)
  }
}

// Returns a default key for the first element - can come back undefined
const getDefaultKey = (data: Array<KeyLabelContent>): KeyValue => {
  const [dp] = data
  const { key } = dp || {}
  return key
}

const findDataByKey = (
  data: Array<KeyLabelContent>,
  key: KeyValue
): KeyLabelContent => {
  const dataPoint = data.find((d) => d.key === key)
  return dataPoint
}

const Tabs = ({
  data,
  selectedKey,
  disabledKeys = [],
  menuOnly = false,
  vertical = false,
  onTabChange,
}: TabsProps) => {
  const [tabData, setTabData] = useState(normalizeData(data, menuOnly))
  const [activeKey, setActiveKey] = useState(selectedKey)
  const [activeContent, setActiveContent] = useState(null)

  // Whenever the external data is changed
  useEffect(() => {
    // set the tab data to the normalized version
    setTabData(normalizeData(data, menuOnly))
  }, [data])

  // Anytime tab data is re-organized
  useEffect(() => {
    // If the current active key no longer represent data
    const dataPoint = findDataByKey(tabData, activeKey)
    if (!dataPoint) {
      // Set a default of the first item in the data set
      setActiveKey(getDefaultKey(tabData))
    }
  }, [tabData])

  // Whenever the active key changes update the corresponding content
  useEffect(() => {
    // gets the corresponding tab data for the key
    const dataPoint = findDataByKey(tabData, activeKey)
    setActiveContent(dataPoint ? dataPoint.content : null)

    // Sends a signal about the active key
    if (typeof onTabChange === 'function') {
      onTabChange(activeKey)
    }
  }, [activeKey])

  // Allows parent componet to change active tab
  // This will trigger [activeKey] useEffect
  useEffect(() => {
    setActiveKey(selectedKey)
  }, [selectedKey])

  return (
    <div
      className={`eq-tabs-container ${vertical ? 'vertical' : 'horizontal'} ${
        menuOnly ? 'menu-only' : ''
      }`}
    >
      <div className="eq-tabs-menu-container">
        <div className="eq-tabs-menu">
          {tabData.map(({ key, label }) => (
            <div
              className={`eq-tab-item ${
                disabledKeys.includes(key) ? 'disabled' : ''
              } ${key === activeKey ? 'active' : ''}`}
              key={key}
              // Only clickable if key is not disabled
              onClick={() => !disabledKeys.includes(key) && setActiveKey(key)}
            >
              {label}
            </div>
          ))}
        </div>
      </div>

      {!menuOnly && <div className="eq-tabs-content">{activeContent}</div>}
    </div>
  )
}

export default Tabs
