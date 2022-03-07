import * as React from 'react'
import { FormRangePicker, AppRangePicker } from './com'
import InputProps from '../../shared/types/input'
import './RangePicker.scss'

/* 
EXAMPLE: 

<RangePicker
  startName="foundedStart"
  endName="foundedEnd"
  label="Founded Range"
/>
*/

interface RangePickerOnlyProps {
  defaultValue: [Date, Date]
  startName: string
  endName: string
}

type RangePickerProps = InputProps & RangePickerOnlyProps

const RangePicker = ({ form = true, ...props }: RangePickerProps) => {
  if (form) return <FormRangePicker {...props} />
  else return <AppRangePicker {...props} />
}

export default RangePicker
