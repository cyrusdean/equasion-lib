import React, { useState } from 'react'

const AppRadio = ({ options, label, onChange, defaultValue = '', ...rest }) => {
  const [currentValue, setCurrentValue] = useState(defaultValue)

  const optionsObj = options.reduce(
    (a, [val, display]) => ({ ...a, [val]: display }),
    {}
  )

  const updateValue = (value) => {
    setCurrentValue(value)
    if (onChange) onChange({ value, display: optionsObj[value] })
  }

  return (
    <div className="eq-radio">
      <label>{label}</label>
      {options.map(([val, display]) => (
        <div
          className="eq-radio-option"
          onClick={() => updateValue(val)}
          key={val}
        >
          <input
            type="radio"
            checked={currentValue === val}
            onChange={() => {}}
            {...rest}
          />
          <div className="radio-button" />
          {display}
        </div>
      ))}
    </div>
  )
}

export default AppRadio
