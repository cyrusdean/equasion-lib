import * as React from 'react'
import { FormUpload, AppUpload } from './com'
import './Upload.scss'

type UploadType = 'default' | 'dropzone' | 'button'

interface UploadProps {
  form: boolean
  onChange: Function
  label: string
  defaultValue: any[]
  buttonText: string
  multiple: boolean
  type: UploadType
}

const Upload = ({ form = true, ...props }: UploadProps) => {
  if (form) return <FormUpload {...props} />
  else return <AppUpload {...props} />
}

export default Upload
