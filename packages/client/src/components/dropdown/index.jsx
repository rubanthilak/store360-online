import React, { useState, useRef } from 'react';
import Card from '@/components/common/Card';
import useClickOutside from '@/hooks/useClickOutside'
/**
 * 
 * @param {any} trigger - Element to be displayed in open trigger
 * @param {any} closeTrigger - Element to be displayed in close trigger (optional) 
 * @param {any} children - Content inside dropdown
 */
 function Dropdown(props) {

    let [open, setOpen] = useState(false);

    let wrapper = useRef("wrapper");

    useClickOutside(wrapper, () => {setOpen(false)});

    function clickHandler() {
       if(!props.closeonclick) return;
       setOpen(!open);
    }

     return (
        <div ref={wrapper} className='cursor-pointer relative inline'>
            <span onClick={() => setOpen(!open)}>
                {
                    props.closeTrigger && open 
                    ? props.closeTrigger
                    : props.trigger
                }
            </span>
            {open && <Card className='absolute z-10 flex-block right-0 top-full p-2 mt-0.5' onClick={clickHandler}>
                {props.children}
            </Card>}
        </div>
     );
 }

 export default Dropdown;