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
  const error = get(form.errors, fieldName)
  const [value, setValue] = useState(form.values[field.name])
  const errorExistsAndFieldTouched = !!error && !!get(form.touched, fieldName)
  const formValue = get(form.values, fieldName)

  useEffect(() => {
    if (formValue !== value) setValue(formValue)
  }, [formValue])

  return (
    <div className={`eq-input ${errorExistsAndFieldTouched ? 'error' : ''}`}>
      <span className="eq-input-icon">{iconBefore}</span>
      {['input', 'number', 'password'].includes(inputType) ? (
        <input
          {...field}
          onBlur={({ target }) => {
            if (manual) return
            if (inputType === 'number')
              form.setFieldValue(field.name, +target.value)
            else form.setFieldValue(field.name, target.value)
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
                form.setFieldValue(field.name, +target.value)
              // @ts-ignore
              else form.setFieldValue(field.name, target.value)
              form.submitForm()
            }
          }}
          value={value}
          type={inputType}
          id={field.name}
          {...rest}
          placeholder=" "
        />
      ) : (
        <textarea
          {...field}
          id={field.name}
          onBlur={({ target }) => {
            if (manual) return
            form.setFieldValue(field.name, target.value)
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
