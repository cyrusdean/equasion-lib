import React from 'react'
import './Alert.scss'

type AlertType = 'default' | 'danger' | 'success' | 'warning'

interface AlertProps {
  className: string
  header: string
  message: string
  style: object
  type: AlertType
  showIcon: boolean
}

const Alert = ({
  header = '',
  message = '',
  type = 'default',
  // showIcon = true,
  className = '',
}: AlertProps) => {
  const combinedClassName = ['eq-alert', `eq-alert-${type}`, className].join(
    ' '
  )
  return (
    <div className={combinedClassName}>
      <span>{header}</span>
      {message}
    </div>
  )
}

export default Alert
