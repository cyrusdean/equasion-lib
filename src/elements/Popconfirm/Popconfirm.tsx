import React, { useState } from 'react'
import Button from '../Button'
import Popover from '../Popover'
import { PopconfirmProps } from './index'

import './Popconfirm.scss'

const Popconfirm = ({
  children,
  hasArrow = true,
  title = 'Are you sure?',
  okText = 'Yes',
  cancelText = 'No',
  description = '',
  onConfirm,
  onCancel,
  style = {},
  ...rest
}: PopconfirmProps) => {
  const [popconfirmOpen, setPopconfirmOpen] = useState(false)

  return (
    // @ts-ignore
    <Popover
      isPopoverOpen={popconfirmOpen}
      setIsPopoverOpen={setPopconfirmOpen}
      position="bottom"
      align="center"
      content={
        <div className="eq-popconfirm-container">
          {/* @ts-ignore */}
          <div className="eq-popconfirm-content">
            {/* @ts-ignore */}
            {<p className="eq-popconfirm-content-title">{title}</p>}
            {/* @ts-ignore */}
            {!!description && (
              <div className="eq-popconfirm-content-description">
                {description}
              </div>
            )}
          </div>

          {/* @ts-ignore */}
          <div className="eq-popconfirm-buttons">
            {/* @ts-ignore */}
            <Button
              size="compact"
              // @ts-ignore
              onClick={() => {
                if (typeof onCancel === 'function') {
                  onCancel()
                }
                setPopconfirmOpen(false)
              }}
            >
              {cancelText}
            </Button>
            {/* @ts-ignore */}
            <Button
              type="primary"
              size="compact"
              // @ts-ignore
              onClick={() => {
                if (typeof onConfirm === 'function') {
                  onConfirm()
                }
                setPopconfirmOpen(false)
              }}
            >
              {okText}
            </Button>
          </div>
        </div>
      }
      {...rest}
    >
      {children}
    </Popover>
  )
}

export default Popconfirm
