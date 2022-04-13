import React, { useState, useEffect, useRef } from 'react'
import { Button } from '../index'
import { Popover } from 'react-tiny-popover'
import './Popconfirm.scss'

interface PopconfirmProps {
  className: string
  children: any
  style: object
  hasArrow: boolean
  isPopconfirmOpen: boolean
  setIsPopconfirmOpen: Function
  title: any
  okText: string
  cancelText: string
  onConfirm: Function
}

const Popconfirm = ({
  children,
  isPopconfirmOpen,
  setIsPopconfirmOpen,
  hasArrow = true,
  title = 'Are you sure?',
  okText = 'Yes',
  cancelText = 'No',
  onConfirm,
  style = {},
  ...rest
}: PopconfirmProps) => {
  const [popoverPosition, setPopoverPosition] = useState({
    top: -1000,
    left: -1000,
  })
  const wrapRef = useRef(null)
  const isManual = !!setIsPopconfirmOpen
  const [isOpen, setIsOpen] = useState(isPopconfirmOpen)

  useEffect(() => {
    setIsOpen(isPopconfirmOpen)
  }, [isPopconfirmOpen])

  const updateOpen = (newOpen) => {
    if (isManual) setIsPopconfirmOpen(newOpen)
    else setIsOpen(newOpen)
  }

  useEffect(() => {
    if (isOpen) {
      const { current: { firstChild = {} } = {} } = wrapRef || {}
      const {
        top = 0,
        left = 0,
        height = 0,
      } = firstChild ? firstChild.getBoundingClientRect() : {}

      setPopoverPosition({
        top: top + height + 10,
        left: left,
      })
    }
  }, [isOpen])

  return (
    <Popover
      isOpen={isOpen}
      positions={['top', 'right']}
      padding={8}
      ref={wrapRef}
      reposition={false}
      onClickOutside={() => updateOpen(false)}
      content={
        <>
          {!!hasArrow && <div className="popover-arrow" />}
          {title}
          <div className="eq-popconfirm-buttons">
            <Button type="danger" size="compact">
              {cancelText}
            </Button>
            <Button type="primary" size="compact">
              {okText}
            </Button>
          </div>
        </>
      }
      containerStyle={style}
      contentLocation={popoverPosition}
      {...rest}
    >
      <div className="eq-popover-wrap" onClick={() => updateOpen(!isOpen)}>
        {children}
      </div>
    </Popover>
  )
}

export default Popconfirm
