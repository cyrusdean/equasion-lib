import React, { useState, useRef } from 'react'
import { Field } from 'formik'
import { FiXCircle } from 'react-icons/fi'
import get from 'lodash.get'
import { DateRangePicker } from 'react-date-range'

const FormWrappedRangePicker = ({
  field,
  form,
  label,
  startName,
  endName,
  iconBefore,
  iconAfter,
  ...rest
}) => {
  const inputRef = useRef(null)
  const [firstSelect, setFirstSelect] = useState(true)
  const [pickerOpen, setPickerOpen] = useState(false)
  const [valueSelected, setValueSelected] = useState(false)
  const error = get(form.errors, startName) || get(form.errors, endName)
  const touched = get(form.touched, startName) || get(form.touched, endName)
  const errorExistsAndFieldTouched = !!error && !!touched
  const startFormValue = get(form.values, startName)
  const endFormValue = get(form.values, endName)
  const selectionRange = {
    startDate: new Date(startFormValue),
    endDate: new Date(endFormValue),
    key: 'selection',
  }

  const checkFocusOfInput = () => {
    setTimeout(() => {
      const inputEl = inputRef.current
      if (inputEl != document.activeElement) setPickerOpen(false)
    }, 150)
  }

  return (
    <div
      className={`eq-rangepicker ${errorExistsAndFieldTouched ? 'error' : ''} ${
        pickerOpen ? 'open' : ''
      }`}
    >
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
        onClick={() => setPickerOpen(true)}
        onBlur={checkFocusOfInput}
        value={`${new Date(startFormValue).toLocaleDateString()} - ${new Date(
          endFormValue
        ).toLocaleDateString()}`}
        id={field.name}
        placeholder=" "
        spellCheck={false}
      />
      <div onClick={() => inputRef.current.focus()}>
        <DateRangePicker
          rangeColors={['var(--primaryColor)']}
          className={pickerOpen ? 'open' : ''}
          ranges={[selectionRange]}
          onChange={({ selection: { startDate, endDate } }) => {
            const newStartDateFormatted = new Date(
              startDate
            ).toLocaleDateString()
            const newEndDateFormatted = new Date(endDate).toLocaleDateString()
            form.setFieldValue(startName, newStartDateFormatted)
            form.setFieldValue(endName, newEndDateFormatted)
            if (firstSelect && newStartDateFormatted === newEndDateFormatted) {
              setFirstSelect(false)
            } else {
              setFirstSelect(true)
              setPickerOpen(false)
              setValueSelected(true)
            }
          }}
          showSelectionPreview={true}
          moveRangeOnFirstSelection={false}
          // months={2}
          direction="horizontal"
        />
      </div>
      <span className="eq-input-icon">{iconAfter}</span>
      {!!label && <label>{label}</label>}
      {!!errorExistsAndFieldTouched && (
        <div className="error-message">
          <FiXCircle />
          {error}
        </div>
      )}
    </div>
  )
}

const FormRangePicker = (props) => (
  <Field component={FormWrappedRangePicker} {...props} />
)

export default FormRangePicker
