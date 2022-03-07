import * as React from 'react'
import { FormSelect, AppSelect } from './com'
import InputProps from '../../shared/types/input'
import './Select.scss'

/*

Where value is the value you want set in the form and display is what you want displayed
options can be:
{ value1: display1, value2: display2 }
["value&display1", "value&display2", "value&display3"]
[[value, display], [value, display]]
[{ value: '', display: '' }, { value: '', display: '' }]

*/

interface SelectOnlyProps {
  options: any[]
  multi: boolean
  defaultValue: string
}

type SelectProps = InputProps & SelectOnlyProps

const calculateOptions = (options) =>
  typeof options === 'object' && !Array.isArray(options)
    ? Object.entries(options)
    : options.map((option) => {
        if (typeof option === 'string') {
          return [option, option]
        } else if (typeof option === 'object' && !Array.isArray(option)) {
          const { value, display } = option
          return [value, display]
        } else {
          return option
        }
      })

const Select = ({ form = true, options, ...props }: SelectProps) => {
  const calcedOptions = calculateOptions(options)
  if (form) return <FormSelect options={calcedOptions} {...props} />
  else return <AppSelect options={calcedOptions} {...props} />
}

export default Select
