import * as React from 'react'
import { FormInput, AppInput } from './com'
import SharedInputProps from '../../shared/types/input'
import './Input.scss'

type InputType = 'input' | 'number' | 'password' | 'textarea'

interface InputOnlyProps {
  inputType: InputType
  defaultValue: string
}

type InputProps = SharedInputProps & InputOnlyProps

const Input = ({ form = true, ...props }: InputProps) => {
  if (form) return <FormInput {...props} />
  else return <AppInput {...props} />
}

export default Input
