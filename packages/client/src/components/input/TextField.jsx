import React from "react";

function TextField(params) {

  function onValueChange(event){
    params.onChange(event);
  }

  return (
    <input
      className="border font-medium rounded-none border-gray-400 pl-2 py-2 focus:outline-none focus:ring-1 focus:border-blue-600"
      placeholder={params.placeHolder}
      onChange={onValueChange}
    />
  );
}

export default TextField;
