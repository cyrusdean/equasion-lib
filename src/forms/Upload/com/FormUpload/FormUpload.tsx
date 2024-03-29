import React, { useRef } from 'react'
import { Field } from 'formik'
import { FiXCircle } from 'react-icons/fi'
import { MdDeleteOutline } from 'react-icons/md'
import { BsFileImage, BsFileText, BsFilePdf } from 'react-icons/bs'
import { Button } from '../../../../elements'
import get from 'lodash.get'

const FormWrappedUpload = ({
  field,
  form,
  label,
  buttonText = 'Choose...',
  multiple = false,
  type = 'default',
  ...rest
}) => {
  const fileInputRef = useRef(null)
  const fieldName = field.name
  const nameIsArry = Array.isArray(fieldName)
  const formattedFieldName = nameIsArry ? fieldName.join('.') : fieldName
  const error = get(form.errors, fieldName)
  const errorExistsAndFieldTouched = !!error && !!get(form.touched, fieldName)
  const fileList = get(form.values, fieldName)
  const openFilePick = () => {
    fileInputRef.current.focus()
    fileInputRef.current.click()
  }

  const combinedClasses = [
    'eq-upload',
    errorExistsAndFieldTouched ? 'error' : '',
    fileList.length ? 'has-files' : '',
    type,
  ].join(' ')

  const updateFieldValue = (val) => form.setFieldValue(formattedFieldName, val)

  return (
    <div className={combinedClasses}>
      <div className="eq-upload-wrap">
        <input
          ref={fileInputRef}
          {...rest}
          onChange={async (e) => {
            // @ts-ignore
            const fileList = [...e.target.files]
            const [firstFile] = fileList
            console.log(firstFile)
            if (!fileList.some(({ size }) => size > 12000000)) {
              multiple
                ? updateFieldValue(fileList)
                : updateFieldValue(fileList.length ? [firstFile] : [])
            } else {
              form.setErrors({ [formattedFieldName]: '12 MB size limit' })
            }
            e.target.value = ''
          }}
          id={formattedFieldName}
          type="file"
          multiple={multiple}
          title=" "
        />
        {['default', 'button'].includes(type) && (
          <Button
            size={type === 'button' ? 'default' : 'compact'}
            // @ts-ignore
            onClick={openFilePick}
          >
            {buttonText}
          </Button>
        )}
        {!!label && <label>{label}</label>}

        {['default', 'dropzone'].includes(type) && (
          <div className="upload-file-list">
            {fileList.map(({ name, type }) => {
              const isImageType = ['svg', 'png', 'jpg', 'jpeg', 'ico'].some(
                (imgType) => type.includes(imgType)
              )
              const isPDFType = type.includes('pdf')
              return (
                <div key={name} className="upload-file">
                  {!!isImageType && <BsFileImage />}
                  {!!isPDFType && <BsFilePdf />}
                  {!isImageType && !isPDFType && <BsFileText />}
                  {name}

                  <MdDeleteOutline
                    className="delete-file"
                    onClick={(e) => {
                      e.stopPropagation()
                      updateFieldValue(
                        fileList.filter((file) => file.name !== name)
                      )
                    }}
                  />
                </div>
              )
            })}
          </div>
        )}
        {!!errorExistsAndFieldTouched && (
          <div className="error-message">
            <FiXCircle />
            {error}
          </div>
        )}
      </div>
    </div>
  )
}

const FormUpload = (props) => <Field component={FormWrappedUpload} {...props} />

export default FormUpload
