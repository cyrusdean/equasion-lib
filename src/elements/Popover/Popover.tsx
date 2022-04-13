import React, { useState, useEffect } from 'react'
import { Popover as ReactPopover } from 'react-tiny-popover'
import './Popover.scss'

interface PopoverProps {
  className: string
  children: any
  style: object
  hasArrow: boolean
  isPopoverOpen: boolean
  setIsPopoverOpen: Function
  content: any
}

const Popover = ({
  content = '',
  children,
  isPopoverOpen,
  setIsPopoverOpen,
  hasArrow = true,
  style = {},
  ...rest
}: PopoverProps) => {
  const isManual = !!setIsPopoverOpen
  const [isOpen, setIsOpen] = useState(isPopoverOpen)

  useEffect(() => {
    setIsOpen(isPopoverOpen)
  }, [isPopoverOpen])

  const updateOpen = (newOpen) => {
    if (isManual) setIsPopoverOpen(newOpen)
    else setIsOpen(newOpen)
  }

  return (
    <ReactPopover
      isOpen={isOpen}
      positions={['bottom', 'left']}
      padding={10}
      reposition={false}
      onClickOutside={() => updateOpen(false)}
      content={
        <>
          {!!hasArrow && <div className="popover-arrow" />}
          {content}
        </>
      }
      containerStyle={style}
      {...rest}
    >
      <div className="eq-popover-wrap" onClick={() => updateOpen(!isOpen)}>
        {children}
      </div>
    </ReactPopover>
  )
}

export default Popover
