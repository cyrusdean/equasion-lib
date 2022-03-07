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
  const error = get(form.errors, fieldName)
  const errorExistsAndFieldTouched = !!error && !!get(form.touched, fieldName)
  const fileList = get(form.values, fieldName)
  const openFilePick = () => {
    fileInputRef.current.focus()
    fileInputRef.current.click()
  }
  console.log(form.values)

  const combinedClasses = [
    'eq-upload',
    errorExistsAndFieldTouched ? 'error' : '',
    fileList.length ? 'has-files' : '',
    type,
  ].join(' ')

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
                ? form.setFieldValue(field.name, fileList)
                : form.setFieldValue(
                    field.name,
                    fileList.length ? [firstFile] : []
                  )
            } else {
              form.setErrors({ [field.name]: '12 MB size limit' })
            }
            e.target.value = ''
          }}
          id={field.name}
          type="file"
          multiple={multiple}
          title=" "
        />
        {type === 'default' && (
          // @ts-ignore
          <Button size="compact" onClick={openFilePick}>
            {buttonText}
          </Button>
        )}
        {!!label && <label>{label}</label>}

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
                    form.setFieldValue(
                      field.name,
                      fileList.filter((file) => file.name !== name)
                    )
                  }}
                />
              </div>
            )
          })}
        </div>
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
