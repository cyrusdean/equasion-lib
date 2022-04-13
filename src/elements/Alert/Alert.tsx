import React from 'react'
import './Alert.scss'

type AlertType = 'error'

interface AlertProps {
  className: string
  message: string
  style: object
  type: AlertType
  showIcon: boolean
}

const Alert = ({
  message = '',
  type = 'error',
  // showIcon = true,
  className = '',
}: AlertProps) => {
  const combinedClassName = ['eq-alert', `eq-alert-${type}`, className].join(
    ' '
  )
  return <div className={combinedClassName}>{message}</div>
}

export default Alert
