import React from "react";

/**
 *
 * @param   {string} value
 * @param   {function} onChange
 * @param   {boolean} error (Red Borders for Invalid Input)
 * @param   {string} placeholder (optional)
 * @param   {boolean} autoFocus (optional)
 * @param   {string} name (optional)
 * @param   {'email' | 'password' | 'text'} type (optional)
 * @param   {boolean} textarea (optional)
 */

const TextField = React.forwardRef(
  ({ onChange, textarea = false, error, ...args }, ref) => {
    const InputElement = textarea ? 'textarea' : 'input';
    return (
      <InputElement
        ref={ref}
        className={`border rounded font-medium border-primary-300 pl-2 py-2 focus:outline-none focus:ring-1 ${error? "border-danger focus:border-danger focus:ring-danger" : "focus:border-primary-600 focus:ring-primary-600"}`}
        onChange={onChange}
        {...args}
      />
    );
  }
);

export default TextField;
