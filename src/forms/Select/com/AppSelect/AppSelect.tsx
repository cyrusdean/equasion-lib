import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'

const AppSelect = ({
  options,
  label,
  multi = false,
  onChange,
  defaultValue = '',
  iconBefore,
  iconAfter,
  ...rest
}) => {
  const [currentValue, setCurrentValue] = useState(
    multi && !defaultValue ? [] : defaultValue
  )
  const [focused, setFocused] = useState(false)
  const [filterValue, setFilterValue] = useState('')

  const optionsObj = options.reduce(
    (a, [val, display]) => ({ ...a, [val]: display }),
    {}
  )

  const calcedOptions = options.filter(
    ([value, display]) =>
      (!multi ||
        (!!multi &&
          // @ts-ignore
          !currentValue.some(
            (selectedOptionValue) => selectedOptionValue === value
          ))) &&
      String(display).toLowerCase().includes(filterValue.toLowerCase())
  )

  const updateValue = (value) => {
    setCurrentValue(value)
    if (onChange) onChange({ value, display: optionsObj[value] })
  }

  const combinedClasses = [
    'eq-select',
    iconBefore ? 'icon-before' : '',
    iconAfter ? 'icon-after' : '',
    focused ? 'open' : '',
  ].join(' ')

  return (
    <div className={combinedClasses}>
      <div style={{ position: 'relative' }}>
        <span className="eq-input-icon">{iconBefore}</span>
        <input
          {...rest}
          onChange={({ target }) => setFilterValue(target.value)}
          onBlur={() => {
            if (!multi) {
              if (
                !calcedOptions.some(
                  ([, display]) =>
                    String(display).toLowerCase() === filterValue.toLowerCase()
                ) ||
                !filterValue
              )
                updateValue('')
            }
            setFocused(false)
          }}
          onFocus={() => {
            setFocused(true)
          }}
          value={filterValue}
          placeholder=" "
          autoComplete="off"
        />
        <span className="eq-input-icon">{iconAfter}</span>
        {!!label && <label>{label}</label>}
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
                // @ts-ignore
                updateValue(multi ? [...currentValue, val] : val)
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
                updateValue('')
              }
            }}
          >
            - No Options Found -
          </div>
        )}
      </div>
      {!!multi &&
        // @ts-ignore
        currentValue.map((selectedOptionValue) => (
          <div className="multi-selected-option" key={selectedOptionValue}>
            {optionsObj[selectedOptionValue]}{' '}
            <IoClose
              onClick={() =>
                updateValue(
                  // @ts-ignore
                  currentValue.filter((val) => val != selectedOptionValue)
                )
              }
            />
          </div>
        ))}
    </div>
  )
}

export default AppSelect
