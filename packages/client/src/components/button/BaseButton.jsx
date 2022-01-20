import React from "react";

function BaseButton(params) {
  return (
    <button
      onClick={params.onClick}
      className={`bg-accent rounded hover:bg-accent-hover text-primary-100 font-medium py-2`}
      {...params}
    >
      {params.label}
    </button>
  );
}

export default BaseButton;
