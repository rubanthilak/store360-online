import React from "react";

function TextField(params) {
  return (
    <input
      className="border rounded-none border-gray-400 pl-2 py-1 focus:outline-none focus:ring-1 focus:border-blue-600"
      placeholder={params.placeHolder}
    />
  );
}

export default TextField;
