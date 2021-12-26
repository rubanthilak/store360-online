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
  ({ onChange, textarea = false, error, ...args }) => {
    const InputElement = textarea ? 'textarea' : 'input';
    return (
      <InputElement
        className={`border font-medium rounded-none border-gray-400 pl-2 py-2 focus:outline-none focus:ring-1 ${error? "border-red-600 focus:border-red-600 focus:ring-red-300" : "focus:border-blue-600"}`}
        onChange={(event) => onChange(event)}
        {...args}
      />
    );
  }
);

export default TextField;
