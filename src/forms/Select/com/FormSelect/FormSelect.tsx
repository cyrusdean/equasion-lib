import React, { useState } from 'react'
import { Field, FastField } from 'formik'
import { Popover } from '../../../../elements'
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
  const nameIsArry = Array.isArray(fieldName)
  const formattedFieldName = nameIsArry ? fieldName.join('.') : fieldName
  const formValue = get(form.values, fieldName)
  const error = get(form.errors, fieldName)
  const [popoverOpen, setPopoverOpen] = useState(false)
  const [filterValue, setFilterValue] = useState(
    multi ? '' : optionsObj[formValue] || ''
  )
  const errorExistsAndFieldTouched = !!error && !!get(form.touched, fieldName)

  const calcedOptions = options.filter(
    ([value, display]) =>
      (!multi ||
        (!!multi &&
          !formValue.some(
            (selectedOptionValue) => selectedOptionValue === value
          ))) &&
      String(display).toLowerCase().includes(filterValue.toLowerCase())
  )

  const combinedClasses = [
    'eq-select',
    iconBefore ? 'icon-before' : '',
    iconAfter ? 'icon-after' : '',
    errorExistsAndFieldTouched ? 'error' : '',
  ]
    .filter(Boolean)
    .join(' ')

  const updateFieldValue = (val) => form.setFieldValue(formattedFieldName, val)
  const [textBeforeSearch, setTextBeforeSearch] = useState('')

  return (
    <div className={combinedClasses}>
      <div style={{ position: 'relative' }}>
        <Popover
          className="eq-select-popover"
          position="bottom"
          align="start"
          // @ts-ignore
          padding={1}
          isPopoverOpen={popoverOpen}
          setIsPopoverOpen={(open) => setPopoverOpen(open)}
          content={
            <div className="eq-select-options">
              {calcedOptions.length ? (
                calcedOptions.map(([val, display]) => (
                  <div
                    key={val}
                    className={`option ${
                      filterValue === display ? 'selected' : ''
                    }`}
                    onMouseDown={() => {
                      if (!multi) setFilterValue(display)
                      else setFilterValue('')
                      updateFieldValue(multi ? [...formValue, val] : val)
                      setPopoverOpen(false)
                    }}
                  >
                    {display}
                  </div>
                ))
              ) : (
                <div
                  className="option"
                  // onMouseDown={() => {
                  //   if (!multi) {
                  //     setFilterValue('')
                  //     updateFieldValue('')
                  //     setPopoverOpen(false)
                  //   }
                  // }}
                >
                  No options found
                </div>
              )}
            </div>
          }
        >
          <>
            <span className="eq-input-icon">{iconBefore}</span>
            <input
              {...field}
              {...rest}
              onClick={(e) => e.stopPropagation()}
              onChange={({ target }) => {
                setFilterValue(target.value)
                if (!popoverOpen) setPopoverOpen(true)
              }}
              onKeyDown={(k) => {
                if (!multi) {
                  const { key } = k || {}
                  if (key === 'Tab') {
                    if (calcedOptions.length > 0) {
                      const [pair = []] = calcedOptions || []
                      const [k = '', v = ''] = pair || []
                      updateFieldValue(k)
                      setFilterValue(v)
                    }
                  }
                }
              }}
              onKeyUp={(k) => {
                const { key } = k || {}
                if (key === 'Enter') {
                  if (calcedOptions.length > 0) {
                    const [pair = []] = calcedOptions || []
                    const [k = '', v = ''] = pair || []
                    if (multi) {
                      updateFieldValue([...(formValue || []), k])
                      setFilterValue('')
                    } else {
                      updateFieldValue(k)
                      setFilterValue(v)
                    }
                  }
                }
              }}
              onBlur={() => {
                // Single Selection at a time
                if (!multi) {
                  if (
                    !calcedOptions.some(
                      ([, display]) =>
                        String(display).toLowerCase() ===
                        filterValue.toLowerCase()
                    )
                  ) {
                    // Updates the field value to empty
                    // updateFieldValue('');
                    if (!!textBeforeSearch) {
                      setFilterValue(textBeforeSearch)
                      setTextBeforeSearch('')
                    } else {
                      setFilterValue('')
                    }
                    // updateFieldValue('')
                  } else if (formValue && !!filterValue)
                    setFilterValue(optionsObj[formValue])
                  // else if (!filterValue) updateFieldValue('')
                }
                setPopoverOpen(false)
              }}
              onFocus={() => {
                setTextBeforeSearch(filterValue)
                setFilterValue('')
                if (!popoverOpen) setPopoverOpen(true)
              }}
              value={filterValue}
              id={formattedFieldName}
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
          </>
        </Popover>
      </div>
      {!!multi &&
        formValue.map((selectedOptionValue) => (
          <div className="multi-selected-option" key={selectedOptionValue}>
            {optionsObj[selectedOptionValue]}{' '}
            <IoClose
              onClick={() =>
                updateFieldValue(
                  formValue.filter((val) => val != selectedOptionValue)
                )
              }
            />
          </div>
        ))}
    </div>
  )
}

const FormSelect = ({ fast, ...props }) =>
  fast ? (
    <FastField component={FormWrappedSelect} {...props} />
  ) : (
    <Field component={FormWrappedSelect} {...props} />
  )

export default FormSelect
