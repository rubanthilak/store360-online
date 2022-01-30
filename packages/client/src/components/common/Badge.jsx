import React from "react";

function Badge(props) {
  const { max, children } = props;
  let value = children;
  if (max && max < children) {
    value = max + "+";
  }
  return (
    <div
      className={`text-xs text-primary-100 rounded-md px-2 inline ${
        props.className ? props.className : " bg-primary-500"
      }`}
    >
      {value}
    </div>
  );
}

export default Badge;
