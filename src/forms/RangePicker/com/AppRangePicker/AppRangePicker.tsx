import React, { useState, useRef } from 'react'
import { DateRangePicker } from 'react-date-range'

const AppRangePicker = ({
  label,
  defaultValue = [new Date(), new Date()],
  onChange,
  iconBefore,
  iconAfter,
  ...rest
}) => {
  const inputRef = useRef(null)
  const [currentValue, setCurrentValue] = useState(defaultValue)
  const [firstSelect, setFirstSelect] = useState(true)
  const [pickerOpen, setPickerOpen] = useState(false)
  const [valueSelected, setValueSelected] = useState(false)
  const [startFormValue, endFormValue] = currentValue
  const selectionRange = {
    startDate: new Date(startFormValue),
    endDate: new Date(endFormValue),
    key: 'selection',
  }

  const updateValue = (value) => {
    setCurrentValue(value)
    if (onChange) onChange({ value })
  }

  const checkFocusOfInput = () => {
    setTimeout(() => {
      const inputEl = inputRef.current
      if (inputEl != document.activeElement) setPickerOpen(false)
    }, 150)
  }

  return (
    <div className={`eq-rangepicker ${pickerOpen ? 'open' : ''}`}>
      <span className="eq-input-icon">{iconBefore}</span>
      <input
        ref={inputRef}
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
            updateValue([newStartDateFormatted, newEndDateFormatted])
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
    </div>
  )
}

export default AppRangePicker
