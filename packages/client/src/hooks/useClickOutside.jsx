import React, { useEffect } from 'react';

/**
 * This Hook can be used for detecting clicks outside the Opened Menu
 * @param ref - DOM Element
 * @param onClickOutside - Callback function to be executed, if clicked outside the DOM Element.
 */
 export default function clickOutside(ref, onClickOutside) {
    useEffect(() => {
      /**
       * Invoke Function onClick outside of element
       */
      function handleClickOutside(event) {
        if (ref?.current && !ref?.current?.contains(event.target)) {
          onClickOutside();
        }
      }
      // Bind
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // dispose
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref, onClickOutside]);
}
