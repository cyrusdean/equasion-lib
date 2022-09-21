import React, { useState, useRef } from 'react'
import { Popover } from '../../../../elements'
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
  const [popoverOpen, setPopoverOpen] = useState(false)
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

  return (
    <div className={`eq-rangepicker ${popoverOpen ? 'open' : ''}`}>
      <Popover
        className="eq-datepicker-popover"
        position="bottom"
        align="start"
        // @ts-ignore
        padding={1}
        isPopoverOpen={popoverOpen}
        setIsPopoverOpen={(open) => setPopoverOpen(open)}
        content={
          <div>
            <DateRangePicker
              rangeColors={['var(--primaryColor)']}
              className={popoverOpen ? 'open' : ''}
              ranges={[selectionRange]}
              onChange={({ selection: { startDate, endDate } }) => {
                const newStartDateFormatted = new Date(
                  startDate
                ).toLocaleDateString()
                const newEndDateFormatted = new Date(
                  endDate
                ).toLocaleDateString()
                updateValue([newStartDateFormatted, newEndDateFormatted])
                if (
                  firstSelect &&
                  newStartDateFormatted === newEndDateFormatted
                ) {
                  setFirstSelect(false)
                } else {
                  setFirstSelect(true)
                  setPopoverOpen(false)
                }
              }}
              showSelectionPreview={true}
              moveRangeOnFirstSelection={false}
              // months={2}
              direction="horizontal"
            />
          </div>
        }
      >
        <>
          <span className="eq-input-icon">{iconBefore}</span>
          <input
            ref={inputRef}
            {...rest}
            onChange={() => {}}
            value={`${new Date(
              startFormValue
            ).toLocaleDateString()} - ${new Date(
              endFormValue
            ).toLocaleDateString()}`}
            placeholder=" "
            spellCheck={false}
          />
          <span className="eq-input-icon">{iconAfter}</span>
          {!!label && <label>{label}</label>}
        </>
      </Popover>
    </div>
  )
}

export default AppRangePicker
