import React from "react";
import useSVG from "@/hooks/useSVG";

function SVGIcon(props) {
  const { error, loading, SvgIcon } = useSVG(props.name);
  if (SvgIcon && !loading && !error) {
    return (
      <SvgIcon.ReactComponent
        fill={props.fill || "var(--color-primary-900)"}
        className={props.className}
        {...props}
      />
    );
  }
  return null;
}

export default SVGIcon;
