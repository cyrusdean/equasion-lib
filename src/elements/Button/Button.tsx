import React from 'react'
import './Button.scss'

type ButtonType =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'subtle'
  | 'link'
  | 'link-subtle'
  | 'success'
  | 'warning'
  | 'danger'

type ButtonSize = 'default' | 'large' | 'compact'

interface ButtonProps {
  className?: string
  children?: any
  style?: object
  type?: ButtonType
  fullWidth?: boolean
  isSubmit?: boolean
  disabled?: boolean
  size?: ButtonSize
  iconBefore?: any
  iconAfter?: any
}

const AppButton = ({
  children,
  style = {},
  className,
  type = 'default',
  fullWidth = false,
  isSubmit = false,
  size = 'default',
  iconBefore: IconBefore,
  iconAfter: IconAfter,
  ...rest
}: ButtonProps) => {
  const defaultStyle = {}
  const combinedClasslassName = [
    'eq-button',
    className,
    `eq-type-${type}`,
    `eq-size-${size}`,
  ].join(' ')
  return (
    <button
      className={combinedClasslassName}
      style={Object.assign(
        { ...defaultStyle, ...style },
        fullWidth ? { width: '100%', display: 'flex' } : {}
      )}
      type={isSubmit ? 'submit' : 'button'}
      {...rest}
    >
      {!!IconBefore && IconBefore}
      <div className="eq-button-inner-wrap">{children}</div>
      {!!IconAfter && IconAfter}
    </button>
  )
}

export default AppButton
