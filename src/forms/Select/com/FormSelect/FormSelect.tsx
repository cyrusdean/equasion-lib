import React, { useState } from 'react'
import { Field } from 'formik'
import { FiXCircle } from 'react-icons/fi'
import { IoClose } from 'react-icons/io5'
import get from 'lodash.get'

const FormWrappedSelect = ({
  field,
  form,
  options,
  label,
  multi = false,
  calculateOptions,
  iconBefore,
  iconAfter,
  ...rest
}) => {
  const optionsObj = options.reduce(
    (a, [value, display]) => ({ ...a, [value]: display }),
    {}
  )
  const fieldName = field.name
  const error = get(form.errors, fieldName)
  const [focused, setFocused] = useState(false)
  const [filterValue, setFilterValue] = useState(
    multi ? '' : optionsObj[form.values[fieldName]] || ''
  )
  const errorExistsAndFieldTouched = !!error && !!get(form.touched, fieldName)
  const formValue = get(form.values, fieldName)

  const calcedOptions = options.filter(
    ([value, display]) =>
      (!multi ||
        (!!multi &&
          !formValue.some(
            (selectedOptionValue) => selectedOptionValue === value
          ))) &&
      display.toLowerCase().includes(filterValue.toLowerCase())
  )

  const combinedClasses = [
    'eq-select',
    iconBefore ? 'icon-before' : '',
    iconAfter ? 'icon-after' : '',
    errorExistsAndFieldTouched ? 'error' : '',
    focused ? 'open' : '',
  ].join(' ')

  return (
    <div className={combinedClasses}>
      <div style={{ position: 'relative' }}>
        <span className="eq-input-icon">{iconBefore}</span>
        <input
          {...field}
          {...rest}
          onChange={({ target }) => setFilterValue(target.value)}
          onBlur={() => {
            if (!multi) {
              if (
                !calcedOptions.some(
                  ([, display]) =>
                    display.toLowerCase() === filterValue.toLowerCase()
                )
              )
                form.setFieldValue(fieldName, '')
              else if (formValue && !!filterValue)
                setFilterValue(optionsObj[formValue])
              else if (!filterValue) form.setFieldValue(fieldName, '')
            }
            setFocused(false)
          }}
          onFocus={() => {
            setFocused(true)
          }}
          value={filterValue}
          id={fieldName}
          placeholder=" "
          autoComplete="off"
        />
        <span className="eq-input-icon">{iconAfter}</span>
        {!!label && <label>{label}</label>}
        {!!errorExistsAndFieldTouched && (
          <div className="error-message">
            <FiXCircle /> {error}
          </div>
        )}
      </div>

      <div className="options">
        {calcedOptions.length ? (
          calcedOptions.map(([val, display]) => (
            <div
              key={val}
              className={`option ${filterValue === display ? 'selected' : ''}`}
              onMouseDown={() => {
                if (!multi) setFilterValue(display)
                else setFilterValue('')
                form.setFieldValue(fieldName, multi ? [...formValue, val] : val)
              }}
            >
              {display}
            </div>
          ))
        ) : (
          <div
            className="option"
            onMouseDown={() => {
              if (!multi) {
                setFilterValue('')
                form.setFieldValue(fieldName, '')
              }
            }}
          >
            - No Options Found -
          </div>
        )}
      </div>
      {!!multi &&
        formValue.map((selectedOptionValue) => (
          <div className="multi-selected-option" key={selectedOptionValue}>
            {optionsObj[selectedOptionValue]}{' '}
            <IoClose
              onClick={() =>
                form.setFieldValue(
                  fieldName,
                  formValue.filter((val) => val != selectedOptionValue)
                )
              }
            />
          </div>
        ))}
    </div>
  )
}

const FormSelect = (props) => <Field component={FormWrappedSelect} {...props} />

export default FormSelect
