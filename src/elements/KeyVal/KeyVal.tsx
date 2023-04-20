import React from 'react'
import './KeyVal.scss'

interface KeyValItemProps {
  key: any
  value: any
}

type KeyValType = 'default' | 'minimal' | 'line'
type KeyValSize = 'default' | 'compact'

interface KeyValProps {
  className?: string
  style?: object
  type?: KeyValType
  size?: KeyValSize
  items: KeyValItemProps[]
}

const KeyVal = ({
  items = [],
  type = 'default',
  size = 'default',
  className,
  ...rest
}: KeyValProps) => {
  const combinedClasslassName = [
    'eq-key-vals',
    className,
    `eq-type-${type}`,
    `eq-size-${size}`,
  ]
    .filter(Boolean)
    .join(' ')
  return (
    <div className={combinedClasslassName} {...rest}>
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
