import { PopoverPosition, PopoverAlign } from 'react-tiny-popover'

export interface PopoverProps {
  className: string
  children: HTMLElement
  style: object
  arrowAttributes: object
  hasArrow: boolean
  disabled: boolean
  isPopoverOpen: boolean
  setIsPopoverOpen: Function
  content: HTMLElement
  position: PopoverPosition
  align: PopoverAlign
}

export { default } from './Popover'
