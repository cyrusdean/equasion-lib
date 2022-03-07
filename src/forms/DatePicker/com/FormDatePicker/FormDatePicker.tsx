import React, { useState, useRef } from 'react'
import { Field } from 'formik'
import { FiXCircle } from 'react-icons/fi'
import get from 'lodash.get'
import { Calendar } from 'react-date-range'

const FormWrappedDatePicker = ({
  field,
  form,
  label,
  iconBefore,
  iconAfter,
  ...rest
}) => {
  const inputRef = useRef(null)
  const [pickerOpen, setPickerOpen] = useState(false)
  const [valueSelected, setValueSelected] = useState(false)
  const fieldName = field.name
  const error = get(form.errors, fieldName)
  const errorExistsAndFieldTouched = !!error && !!get(form.touched, fieldName)
  const formValue = get(form.values, fieldName)

  const checkFocusOfInput = () => {
    setTimeout(() => {
      const inputEl = inputRef.current
      if (inputEl != document.activeElement) setPickerOpen(false)
    }, 150)
  }

  const combinedClasses = [
    'eq-datepicker',
    iconBefore ? 'icon-before' : '',
    iconAfter ? 'icon-after' : '',
    errorExistsAndFieldTouched ? 'error' : '',
    pickerOpen ? 'open' : '',
  ].join(' ')

  return (
    <div className={combinedClasses}>
      <span className="eq-input-icon">{iconBefore}</span>
      <input
        ref={inputRef}
        {...field}
        {...rest}
        onChange={() => {}}
        onFocus={() => {
          if (!valueSelected) setPickerOpen(true)
          else setValueSelected(false)
        }}
        onClick={(e) => {
          e.preventDefault()
          setPickerOpen(true)
        }}
        onBlur={checkFocusOfInput}
        value={new Date(formValue).toISOString().split('T')[0]}
        id={field.name}
        placeholder=" "
        spellCheck={false}
        type="date"
      />
      <div onClick={() => inputRef.current.focus()}>
        <Calendar
          color="var(--primaryColor)"
          className={pickerOpen ? 'open' : ''}
          date={new Date(formValue)}
          onChange={(newDate) => {
            const newDateFormatted = new Date(newDate).toLocaleDateString()
            form.setFieldValue(field.name, newDateFormatted)
            setValueSelected(true)
            setPickerOpen(false)
          }}
        />
      </div>
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

const FormDatePicker = (props) => (
  <Field component={FormWrappedDatePicker} {...props} />
)

export default FormDatePicker
