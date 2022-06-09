import { PopoverProps } from '../Popover'

export interface PopconfirmProps extends PopoverProps {
  className: string
  style: object
  title: String
  description: HTMLElement | String
  okText: string
  cancelText: string
  onConfirm: Function
  onCancel: Function
}

export { default } from './Popconfirm'
