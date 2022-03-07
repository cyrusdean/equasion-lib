import React from 'react'
import { Field } from 'formik'
import { BiErrorCircle } from 'react-icons/bi'
import get from 'lodash.get'

const FormWrappedRadio = ({ field, form, options, label, ...rest }) => {
  const fieldName = field.name
  const error = get(form.errors, fieldName)
  const errorExistsAndFieldTouched = !!error && !!get(form.touched, fieldName)
  const formValue = get(form.values, fieldName)

  return (
    <div className={`eq-radio ${errorExistsAndFieldTouched ? 'error' : ''}`}>
      <label>{label}</label>
      {options.map(([val, display]) => (
        <div
          className="eq-radio-option"
          onClick={() => form.setFieldValue(field.name, val)}
          key={val}
        >
          <input
            {...field}
            type="radio"
            checked={formValue === val}
            onChange={() => {}}
            {...rest}
          />
          <div className="radio-button" />
          {display}
        </div>
      ))}

      {!!errorExistsAndFieldTouched && (
        <div className="error-message">{error}</div>
      )}
      {!!errorExistsAndFieldTouched && <BiErrorCircle />}
    </div>
  )
}

const FormRadio = (props) => <Field component={FormWrappedRadio} {...props} />

export default FormRadio
