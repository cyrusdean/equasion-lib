import React from 'react'
import './Lozenge.scss'

type LozengeType =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'green'
  | 'yellow'
  | 'orange'
  | 'red'
  | 'purple'
  | 'blue'

interface LozengeProps {
  className: string
  children: any
  style: object
  type: LozengeType
  light: boolean
}

const AppLozenge = ({
  children,
  style = {},
  className,
  type = 'default',
  light = false,
  ...rest
}: LozengeProps) => {
  const defaultStyle = {}
  const combinedClasslassName = [
    'eq-lozenge',
    className,
    `eq-type-${type}`,
    `eq-brightness-${light ? 'light' : 'dark'}`,
  ].join(' ')
  return (
    <div
      className={combinedClasslassName}
      style={Object.assign({ ...defaultStyle, ...style })}
      {...rest}
    >
      {children}
    </div>
  )
}

export default AppLozenge
