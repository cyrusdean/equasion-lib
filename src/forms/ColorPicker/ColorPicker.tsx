import React from 'react';
import { Field } from 'formik';
import './ColorPicker.scss';
import ColorPicker from 'rc-color-picker';

const AppColorPicker = ({ field, form, options, children, ...rest }) => {
  const errorExistsAndFieldTouched =
    !!form.errors[field.name] && !!form.touched[field.name];

  return (
    <ColorPicker
      {...field}
      onChange={({ color }) => form.setFieldValue(field.name, color)}
      {...rest}
      animation="slide-up"
      color={form.values[field.name]}
      defaultColor={form.values[field.name]}
      className="color-picker-form-item"
    />
  );
};

const FormikColorPicker = (props) => <Field component={AppColorPicker} {...props} />;

export default FormikColorPicker;
