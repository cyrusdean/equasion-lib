// @ts-nocheck
import React, { useState } from 'react'

const AppInput = ({
  inputType = 'input',
  manual = false,
  defaultValue = '',
  label,
  onChange,
  iconBefore,
  iconAfter,
  ...rest
}) => {
  const [, setCurrentValue] = useState(defaultValue)

  const updateValue = (value) => {
    setCurrentValue(value)
    if (onChange) onChange({ value })
  }

  return (
    <div className="eq-input">
      <span className="eq-input-icon">{iconBefore}</span>
      {['input', 'number', 'password'].includes(inputType) ? (
        <input
          onBlur={({ target }) => {
            if (manual) return
            if (inputType === 'number') updateValue(+target.value)
            else updateValue(target.value)
          }}
          onChange={({ target }) => {
            if (inputType === 'number' && !!target.value)
              updateValue(+target.value)
            else updateValue(target.value)
          }}
          onKeyDown={({ target, keyCode }) => {
            if (keyCode === 13) {
              // @ts-ignore
              if (inputType === 'number') updateValue(+target.value)
              // @ts-ignore
              else updateValue(target.value)
            }
          }}
          type={inputType}
          {...rest}
          placeholder=" "
        />
      ) : (
        <textarea
          onBlur={({ target }) => {
            if (manual) return
            updateValue(target.value)
          }}
          onChange={({ target }) => {
            if (manual) return
            updateValue(target.value)
          }}
          {...rest}
        />
      )}
      <span className="eq-input-icon">{iconAfter}</span>
      {!!label && <label>{label}</label>}
    </div>
  )
}

export default AppInput