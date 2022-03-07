import React from 'react';
import './Page.scss';

const Page = ({ children, className }) => (
  <div className={`page ${className || ''}`}>{children}</div>
);

export default Page;
