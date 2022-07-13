import React from 'react'
import { Field } from 'formik'
import { FiCheck, FiXCircle } from 'react-icons/fi'
import get from 'lodash.get'

const FormWrappedCheckbox = ({ field, form, label, ...rest }) => {
  const fieldName = field.name
  const nameIsArry = Array.isArray(fieldName)
  const formattedFieldName = nameIsArry ? fieldName.join('.') : fieldName
  const error = get(form.errors, fieldName)
  const formValue = get(form.values, fieldName)
  const errorExistsAndFieldTouched = !!error && !!get(form.touched, fieldName)
  const checked = rest.checked || formValue

  const updateFieldValue = (val) => form.setFieldValue(formattedFieldName, val)

  return (
    <div
      className={`eq-checkbox ${error ? 'error' : ''}`}
      onClick={() => updateFieldValue(!checked)}
    >
      <input
        {...field}
        type="checkbox"
        checked={checked}
        onClick={(e) => e.stopPropagation()}
        {...rest}
      />
      <div className="box">
        <FiCheck />
      </div>
      <label>{label}</label>

      {!!errorExistsAndFieldTouched && (
        <div className="error-message">
          <FiXCircle />
          {error}
        </div>
      )}
    </div>
  )
}

const FormCheckbox = (props) => (
  <Field component={FormWrappedCheckbox} {...props} />
)

export default FormCheckbox
