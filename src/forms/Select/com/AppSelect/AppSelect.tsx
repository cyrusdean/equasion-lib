import React, { useState, useEffect } from 'react'
import { Popover } from '../../../../elements'
import { IoClose } from 'react-icons/io5'

const AppSelect = ({
  options,
  label,
  multi = false,
  onChange,
  defaultValue = '',
  value: outsideValue,
  iconBefore,
  iconAfter,
  ...rest
}) => {
  const optionsObj = options.reduce(
    (a, [val, display]) => ({ ...a, [val]: display }),
    {}
  )
  const [focused, setFocused] = useState(false)
  const [filterValue, setFilterValue] = useState(
    defaultValue ? optionsObj[defaultValue] || '' : ''
  )
  const [currentValue, setCurrentValue] = useState(
    multi && !defaultValue ? [] : defaultValue
  )

  const calcedOptions = options.filter(
    ([value, display]) =>
      (!multi ||
        (!!multi &&
          // @ts-ignore
          !currentValue.some(
            (selectedOptionValue) => selectedOptionValue === value
          ))) &&
      String(display).toLowerCase().includes(String(filterValue).toLowerCase())
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

  useEffect(() => {
    setCurrentValue(multi && !outsideValue ? [] : outsideValue)
    setFilterValue(outsideValue ? optionsObj[outsideValue] || '' : '')
  }, [outsideValue])

  return (
    <div className={combinedClasses}>
      <div style={{ position: 'relative' }}>
        <Popover
          className="eq-select-popover"
          position="bottom"
          align="start"
          // @ts-ignore
          padding={1}
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
          }
        >
          <>
            <span className="eq-input-icon">{iconBefore}</span>
            <input
              {...rest}
              onChange={({ target }) => setFilterValue(target.value)}
              onBlur={() => {
                if (!multi) {
                  if (
                    !calcedOptions.some(
                      ([, display]) =>
                        String(display).toLowerCase() ===
                        String(filterValue).toLowerCase()
                    ) ||
                    !filterValue
                  )
                    updateValue('')
                }
                setFocused(false)
              }}
              onFocus={() => {
                setFocused(true)
                setFilterValue('')
              }}
              value={filterValue}
              placeholder=" "
              autoComplete="off"
            />
            <span className="eq-input-icon">{iconAfter}</span>
            {!!label && <label>{label}</label>}
          </>
        </Popover>
      </div>

      {/* <div className="options">
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
      </div> */}
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
