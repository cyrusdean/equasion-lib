import React, { useState, useEffect } from 'react'
import { PopoverProps } from './index'
import { Popover as ReactPopover, ArrowContainer } from 'react-tiny-popover'
import './Popover.scss'

const Popover = ({
  content,
  children,
  isPopoverOpen,
  setIsPopoverOpen,
  hasArrow = true,
  disabled,
  arrowAttributes = {},
  style = {},
  position = 'top',
  align = 'center',
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
    // @ts-ignore
    <ReactPopover
      containerClassName="eq-popover-container"
      isOpen={isOpen}
      positions={[position, 'top', 'right', 'bottom', 'left']}
      padding={10}
      onClickOutside={() => updateOpen(false)}
      content={({ position: arrowPosition, childRect, popoverRect }) => {
        return (
          // @ts-ignore
          <ArrowContainer
            position={arrowPosition}
            childRect={childRect}
            popoverRect={popoverRect}
            className={`popover-arrow-container ${arrowPosition}`}
            arrowClassName={`popover-arrow ${arrowPosition}`}
            {...(hasArrow && {
              arrowColor: 'var(--n0)',
              arrowSize: 9,
            })}
            {...arrowAttributes}
          >
            {content}
          </ArrowContainer>
        )
      }}
      containerStyle={style}
      align={align}
      {...rest}
    >
      {/* @ts-ignore */}
      <div
        className="eq-popover-wrap"
        onClick={() => {
          !disabled && updateOpen(!isOpen)
        }}
      >
        {children}
      </div>
    </ReactPopover>
  )
}

export default Popover
