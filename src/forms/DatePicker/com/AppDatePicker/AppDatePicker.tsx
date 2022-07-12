import React, { useState } from 'react'
import { Calendar } from 'react-date-range'
import { Popover } from '../../../../elements'

const AppDatePicker = ({
  label,
  onChange,
  defaultValue = new Date(),
  iconBefore,
  iconAfter,
  ...rest
}) => {
  const [popoverOpen, setPopoverOpen] = useState(false)
  const [currentValue, setCurrentValue] = useState(defaultValue)

  const updateValue = (value) => {
    setCurrentValue(value)
    if (onChange) onChange({ value })
  }

  const combinedClasses = [
    'eq-datepicker',
    iconBefore ? 'icon-before' : '',
    iconAfter ? 'icon-after' : '',
  ].join(' ')

  return (
    <div className={combinedClasses}>
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
            <Calendar
              color="var(--primaryColor)"
              date={new Date(currentValue)}
              onChange={(newDate) => {
                const newDateFormatted = new Date(newDate).toLocaleDateString()
                updateValue(newDateFormatted)
                setPopoverOpen(false)
              }}
            />
          </div>
        }
      >
        <>
          <span className="eq-input-icon">{iconBefore}</span>
          <input
            {...rest}
            onChange={() => {}}
            value={new Date(currentValue).toISOString().split('T')[0]}
            placeholder=" "
            spellCheck={false}
            type="date"
          />
          <span className="eq-input-icon">{iconAfter}</span>
          {!!label && <label>{label}</label>}
        </>
      </Popover>
    </div>
  )
}

export default AppDatePicker
