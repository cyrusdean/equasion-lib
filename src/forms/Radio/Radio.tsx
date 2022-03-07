import * as React from 'react'
import { FormRadio, AppRadio } from './com'
import './Radio.scss'

/*

Where value is the value you want set in the form and display is what you want displayed
options can be:
{ value1: display1, value2: display2 }
["value&display1", "value&display2", "value&display3"]
[[value, display], [value, display]]
[{ value: '', display: '' }, { value: '', display: '' }]

*/

interface RadioProps {
  form: boolean
  onChange: Function
  options: any[]
  label: string
  defaultValue: string
}

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

const Radio = ({ form = true, options, ...props }: RadioProps) => {
  const calcedOptions = calculateOptions(options)
  if (form) return <FormRadio options={calcedOptions} {...props} />
  else return <AppRadio options={calcedOptions} {...props} />
}

export default Radio
