import * as React from 'react'
import { FormDatePicker, AppDatePicker } from './com'
import InputProps from '../../shared/types/input'
import './DatePicker.scss'

interface DatePickerOnlyProps {
  defaultValue: Date
}

type DatePickerProps = InputProps & DatePickerOnlyProps

const DatePicker = ({ form = true, ...props }: DatePickerProps) => {
  if (form) return <FormDatePicker {...props} />
  else return <AppDatePicker {...props} />
}

export default DatePicker
