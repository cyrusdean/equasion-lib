// @ts-nocheck
import React, { useState, useEffect } from 'react'
import { Field } from 'formik'
import { FiXCircle } from 'react-icons/fi'
import get from 'lodash.get'

const FormWrappedInput = ({
  field,
  form,
  inputType = 'input',
  manual = false,
  label,
  iconBefore,
  iconAfter,
  ...rest
}) => {
  const fieldName = field.name
  const nameIsArry = Array.isArray(fieldName)
  const formattedFieldName = nameIsArry ? fieldName.join('.') : fieldName
  const error = get(form.errors, fieldName)
  const formValue = get(form.values, fieldName)
  const [value, setValue] = useState(formValue)
  const errorExistsAndFieldTouched = !!error && !!get(form.touched, fieldName)

  useEffect(() => {
    if (formValue !== value) setValue(formValue)
  }, [formValue])

  const updateFieldValue = (val) => form.setFieldValue(formattedFieldName, val)

  return (
    <div className={`eq-input ${errorExistsAndFieldTouched ? 'error' : ''}`}>
      <span className="eq-input-icon">{iconBefore}</span>
      {['input', 'number', 'password'].includes(inputType) ? (
        <input
          {...field}
          name={formattedFieldName}
          onBlur={({ target }) => {
            if (manual) return
            if (inputType === 'number') updateFieldValue(+target.value)
            else updateFieldValue(target.value)
          }}
          onInput={({ target }) => {
            if (inputType === 'number' && !!target.value)
              setValue(+target.value)
            else setValue(target.value)
          }}
          onKeyDown={({ target, keyCode }) => {
            if (keyCode === 13) {
              if (inputType === 'number')
                // @ts-ignore
                updateFieldValue(+target.value)
              // @ts-ignore
              else updateFieldValue(target.value)
              form.submitForm()
            }
          }}
          value={value}
          type={inputType}
          id={formattedFieldName}
          {...rest}
          placeholder=" "
        />
      ) : (
        <textarea
          {...field}
          id={formattedFieldName}
          onBlur={({ target }) => {
            if (manual) return
            updateFieldValue(target.value)
          }}
          onChange={({ target }) => {
            if (manual) return
            setValue(target.value)
          }}
          {...rest}
          value={value}
          autoSize={{ minRows: 4, maxRows: 6 }}
        />
      )}
      <span className="eq-input-icon">{iconAfter}</span>
      {!!label && <label>{label}</label>}
      {!!errorExistsAndFieldTouched && (
        <div className="error-message">
          <FiXCircle /> {error}
        </div>
      )}
    </div>
  )
}

const FormInput = (props) => <Field component={FormWrappedInput} {...props} />

export default FormInput
