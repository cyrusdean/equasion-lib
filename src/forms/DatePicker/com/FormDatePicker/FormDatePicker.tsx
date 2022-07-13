import React, { useState } from 'react'
import { Field } from 'formik'
import { FiXCircle } from 'react-icons/fi'
import { Popover } from '../../../../elements'
import get from 'lodash.get'
import { Calendar } from 'react-date-range'

const FormWrappedDatePicker = ({
  field,
  form,
  label,
  iconBefore,
  iconAfter,
  ...rest
}) => {
  const [popoverOpen, setPopoverOpen] = useState(false)
  const fieldName = field.name
  const nameIsArry = Array.isArray(fieldName)
  const formattedFieldName = nameIsArry ? fieldName.join('.') : fieldName
  const error = get(form.errors, fieldName)
  const errorExistsAndFieldTouched = !!error && !!get(form.touched, fieldName)
  const formValue = get(form.values, fieldName)

  const combinedClasses = [
    'eq-datepicker',
    iconBefore ? 'icon-before' : '',
    iconAfter ? 'icon-after' : '',
    errorExistsAndFieldTouched ? 'error' : '',
  ].join(' ')

  const updateFieldValue = (val) => form.setFieldValue(formattedFieldName, val)

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
              date={new Date(formValue)}
              onChange={(newDate) => {
                const newDateFormatted = new Date(newDate).toLocaleDateString()
                updateFieldValue(newDateFormatted)
                setPopoverOpen(false)
              }}
            />
          </div>
        }
      >
        <>
          <span className="eq-input-icon">{iconBefore}</span>
          <input
            {...field}
            {...rest}
            onChange={() => {}}
            value={new Date(formValue).toISOString().split('T')[0]}
            id={formattedFieldName}
            placeholder=" "
            spellCheck={false}
            type="date"
          />
          <span className="eq-input-icon">{iconAfter}</span>
          {!!label && <label>{label}</label>}
          {!!errorExistsAndFieldTouched && (
            <div className="error-message">
              <FiXCircle /> {error}
            </div>
          )}
        </>
      </Popover>
    </div>
  )
}

const FormDatePicker = (props) => (
  <Field component={FormWrappedDatePicker} {...props} />
)

export default FormDatePicker
