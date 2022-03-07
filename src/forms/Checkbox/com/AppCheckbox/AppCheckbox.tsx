import React, { useState } from 'react'
import { FiCheck } from 'react-icons/fi'

const AppCheckbox = ({ defaultValue = false, onChange, label, ...rest }) => {
  const [currentValue, setCurrentValue] = useState(defaultValue)

  const updateValue = (value) => {
    setCurrentValue(value)
    if (onChange) onChange({ value })
  }

  return (
    <div className="eq-checkbox" onClick={() => updateValue(!currentValue)}>
      <input
        type="checkbox"
        checked={currentValue}
        onClick={(e) => e.stopPropagation()}
        onChange={() => {}}
        {...rest}
      />
      <div className="box">
        <FiCheck />
      </div>
      <label>{label}</label>
    </div>
  )
}

export default AppCheckbox
