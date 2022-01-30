import React from "react";
import SVGIcon from "@/components/common/svg-icon/SVGIcon";

/**
 * 
 * @param {string} icon - Icon to be displayed on the front of text. 
 * @param {string} link - "href" for the additional link.
 * @param {string} linkText - Text for href link.
 * @param {boolean} truncate - If the children has longer lengthy text, this flag will minimize the text and add "..." at the end.
 * @param {function} onClick - This function is to close the banner by clicking on the "x" icon.
 */
function Banner(props) {
  return (
    <div className="flex items-center bg-accent py-3 pl-3 pr-4 justify-between">
        <div className="flex items-center w-8/12 lg:w-11/12">
          {props.icon && <SVGIcon icon={props.icon} fill="var(--color-primary-100)" className="w-5 h-5" />}
          <p className={`text-sm text-primary-100 ml-2 w-8/12 lg:w-11/12 ${props.truncate && "truncate"}`}>
            {props.children}
            {!props.truncate && props.link && <a href={props.link} className="text-sm text-primary-100 underline ml-1">{props.linkText}</a>}
          </p>
          {props.truncate && props.link && <a href={props.link} className="text-sm text-primary-100 underline ml-1">{props.linkText}</a>}
        </div>
        <div className="cursor-pointer" onClick={props.onClick}>
          <SVGIcon icon="close" fill="var(--color-primary-100)" className="w-5 h-5"/>
        </div>
    </div>
  );
}

export default Banner;
