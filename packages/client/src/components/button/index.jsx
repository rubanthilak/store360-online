import React from "react";
import Bounce from "@/components/animation/bounce";
import { Link } from "react-router-dom";
import "./style.scss";

function getColors(type){
  switch(type){
    case "primary":
      return "bg-primary-900 hover:bg-primary-800 shadow";
    case "secondary":
      return "bg-secondary hover:shadow-md";
    case "accent":
      return "bg-accent hover:bg-accent-hover";
    case "success":
      return "bg-success hover:bg-success-hover";
    case "danger":
      return "bg-danger hover:bg-danger-hover";
    case "warning":
      return "bg-warning hover:bg-warning-hover";
    case "link":
      return "text-secondary";
    case "text":
      return "text-primary-900";
    default:
      return "bg-primary-900 hover:bg-primary-800 shadow";
  }
}

function getSize(size){
  switch(size){
    case "small":
      return "text-sm px-3 py-1";
    case "mini":
      return "text-xs px-2 py-0.5";
    case "icon":
      return "p-1";
    default:
      return "py-2 px-4 btn-width"
  }
}

function Button(params) {
  let Button = (
    <button
      onClick={params.onClick}
      type={params.type}
      className={` ${getColors(params.appearance)} ${getSize(params.size)} ${params.isSpan && "w-full"} ${params.className} flex gap-1 items-center justify-center rounded cursor-pointer text-primary-100 font-medium`}
    >
      {
        params.isLoading
        ? <Bounce/>
        : params.children
          ? params.children
          : params.label
        
      }
    </button>
  );
  if(params.href){
    return (
        <Link to={params.href} target={params.target}>
            {Button}
        </Link>
    )
  }
  return Button;
}

export default Button;
