import React, { useState, useRef } from 'react'
import { Popover } from '../../../../elements'
import { Field } from 'formik'
import { FiXCircle } from 'react-icons/fi'
import get from 'lodash.get'
import { DateRangePicker } from 'react-date-range'

const FormWrappedRangePicker = ({
  field,
  form,
  label,
  startName,
  endName,
  iconBefore,
  iconAfter,
  ...rest
}) => {
  const inputRef = useRef(null)
  const [firstSelect, setFirstSelect] = useState(true)
  const [popoverOpen, setPopoverOpen] = useState(false)
  const error = get(form.errors, startName) || get(form.errors, endName)
  const touched = get(form.touched, startName) || get(form.touched, endName)
  const errorExistsAndFieldTouched = !!error && !!touched
  const startFormValue = get(form.values, startName)
  const endFormValue = get(form.values, endName)
  const selectionRange = {
    startDate: new Date(startFormValue),
    endDate: new Date(endFormValue),
    key: 'selection',
  }

  return (
    <div
      className={`eq-rangepicker ${errorExistsAndFieldTouched ? 'error' : ''} ${
        popoverOpen ? 'open' : ''
      }`}
    >
      <Popover
        className="eq-datepicker-popover"
        position="bottom"
        align="start"
        // @ts-ignore
        padding={1}
        isPopoverOpen={popoverOpen}
        setIsPopoverOpen={(open) => setPopoverOpen(open)}
        content={
          <div onClick={() => inputRef.current.focus()}>
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
                form.setFieldValue(startName, newStartDateFormatted)
                form.setFieldValue(endName, newEndDateFormatted)
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
            {...field}
            {...rest}
            onChange={() => {}}
            value={`${new Date(
              startFormValue
            ).toLocaleDateString()} - ${new Date(
              endFormValue
            ).toLocaleDateString()}`}
            id={field.name}
            placeholder=" "
            spellCheck={false}
          />
          <span className="eq-input-icon">{iconAfter}</span>
          {!!label && <label>{label}</label>}
          {!!errorExistsAndFieldTouched && (
            <div className="error-message">
              <FiXCircle />
              {error}
            </div>
          )}
        </>
      </Popover>
    </div>
  )
}

const FormRangePicker = (props) => (
  <Field component={FormWrappedRangePicker} {...props} />
)

export default FormRangePicker
