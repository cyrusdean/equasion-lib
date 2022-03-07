import React, { useState, useRef } from 'react'
import { Calendar } from 'react-date-range'

const AppDatePicker = ({
  label,
  onChange,
  defaultValue = new Date(),
  iconBefore,
  iconAfter,
  ...rest
}) => {
  const inputRef = useRef(null)
  const [currentValue, setCurrentValue] = useState(defaultValue)
  const [pickerOpen, setPickerOpen] = useState(false)
  const [valueSelected, setValueSelected] = useState(false)

  const checkFocusOfInput = () => {
    setTimeout(() => {
      const inputEl = inputRef.current
      if (inputEl != document.activeElement) setPickerOpen(false)
    }, 150)
  }

  const updateValue = (value) => {
    setCurrentValue(value)
    if (onChange) onChange({ value })
  }

  const combinedClasses = [
    'eq-datepicker',
    iconBefore ? 'icon-before' : '',
    iconAfter ? 'icon-after' : '',
    pickerOpen ? 'open' : '',
  ].join(' ')

  return (
    <div className={combinedClasses}>
      <span className="eq-input-icon">{iconBefore}</span>
      <input
        ref={inputRef}
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
        value={new Date(currentValue).toISOString().split('T')[0]}
        placeholder=" "
        spellCheck={false}
        type="date"
      />
      <div onClick={() => inputRef.current.focus()}>
        <Calendar
          color="var(--primaryColor)"
          className={pickerOpen ? 'open' : ''}
          date={new Date(currentValue)}
          onChange={(newDate) => {
            const newDateFormatted = new Date(newDate).toLocaleDateString()
            updateValue(newDateFormatted)
            setValueSelected(true)
            setPickerOpen(false)
          }}
        />
      </div>
      <span className="eq-input-icon">{iconAfter}</span>
      {!!label && <label>{label}</label>}
    </div>
  )
}

export default AppDatePicker
