import React from "react";
import SVGIcon from "@/components/common/svg-icon/SVGIcon";
import { Link } from "react-router-dom";

/**
 * This function returns TailwindCSS Class for Avatar size.
 * @params {string} size - "small/medium/large/x-large/xx-large"
 */
function getAvatarSize(size){
    switch(size){
        case "small":
            return "w-6 h-6";
        case "medium":
            return "w-8 h-8";
        case "large":
            return "w-12 h-12";
        case "x-large":
            return "w-16 h-16";
        case "xx-large":
            return "w-24 h-24";
        default:
            return "w-8 h-8";
    }
}

/** 
 * This function returns Avatar UI Component
 * @params {string} type- "circle" (or) "square"
 * @params {string} size - "small/medium/large/x-large/xx-large"
 */
function Avatar(props) {
  const { size, type, href, target, label, imageUrl, onClick } = props;
  const className=`${type==="circle" ? "rounded-full" : "rounded-md"} bg-primary-400 ${getAvatarSize(size)}`
  const Avatar = (
    <div onClick={onClick}>
      {imageUrl ? (
       <img src={imageUrl} alt={label} className={className} />
      ) : (
        <SVGIcon
        icon="user"
        fill="var(--color-primary-100)"
        className={className}
      />
      )}
    </div>
  );
  if(href){
    return (
        <Link to={href} target={target}>
            {Avatar}
        </Link>
    )
  }
  return Avatar;
}

export default Avatar;
