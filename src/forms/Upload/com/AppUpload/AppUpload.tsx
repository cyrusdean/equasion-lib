import React, { useState, useRef } from 'react'
import { MdDeleteOutline } from 'react-icons/md'
import { BsFileImage, BsFileText, BsFilePdf } from 'react-icons/bs'
import { Button } from '../../../../elements'

const AppUpload = ({
  label,
  buttonText = 'Choose...',
  multiple = false,
  type = 'default',
  onChange,
  defaultValue = [],
  ...rest
}) => {
  const fileInputRef = useRef(null)
  const [currentValue, setCurrentValue] = useState(defaultValue)
  const openFilePick = () => {
    fileInputRef.current.focus()
    fileInputRef.current.click()
  }

  const updateValue = (value) => {
    setCurrentValue(value)
    if (onChange) onChange({ value })
  }

  const combinedClasses = [
    'eq-upload',
    currentValue.length ? 'has-files' : '',
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
            if (!fileList.some(({ size }) => size > 12000000)) {
              multiple
                ? updateValue(fileList)
                : updateValue(fileList.length ? [firstFile] : [])
            } else {
              console.log('12 MB size limit')
            }
            e.target.value = ''
          }}
          type="file"
          multiple={multiple}
          title=" "
        />
        {['default', 'button'].includes(type) && (
          // @ts-ignore
          <Button size="compact" onClick={openFilePick}>
            {buttonText}
          </Button>
        )}
        {!!label && <label>{label}</label>}
        {['default', 'dropzone'].includes(type) && (
          <div className="upload-file-list">
            {currentValue.map(({ name, type }) => {
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
                    onClick={() =>
                      updateValue(
                        currentValue.filter((file) => file.name !== name)
                      )
                    }
                  />
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default AppUpload
