import { ReactElement } from 'react'
import { PopoverPosition, PopoverAlign } from 'react-tiny-popover'

export interface PopoverProps {
  className?: string
  children?: ReactElement
  style?: object
  arrowAttributes?: object
  hasArrow?: boolean
  disabled?: boolean
  isPopoverOpen: boolean
  setIsPopoverOpen?: Function
  content: ReactElement
  position?: PopoverPosition
  align?: PopoverAlign
}

export { default } from './Popover'
