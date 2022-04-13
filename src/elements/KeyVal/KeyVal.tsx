import React from 'react'
import './KeyVal.scss'

interface KeyValItemProps {
  key: any
  value: any
}

interface KeyValProps {
  className: string
  style: object
  items: KeyValItemProps[]
}

const KeyVal = ({ items = [], ...rest }: KeyValProps) => {
  return (
    <div className="eq-key-vals" {...rest}>
      {items.map(({ key, value }) => (
        <div className="eq-key-val" key={key}>
          <span className="eq-key">{key}: </span>
          <span className="eq-value">{value}</span>
        </div>
      ))}
    </div>
  )
}

export default KeyVal
