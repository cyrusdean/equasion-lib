import * as React from 'react';
import { FormCheckbox, AppCheckbox } from './com';
import './Checkbox.scss';

interface CheckboxProps {
  form: boolean;
  onChange: Function;
  label: string;
  defaultValue: boolean;
}

const Checkbox = ({ form = true, ...props }: CheckboxProps) => {
  if (form) return <FormCheckbox {...props} />;
  else return <AppCheckbox {...props} />;
};

export default Checkbox;
