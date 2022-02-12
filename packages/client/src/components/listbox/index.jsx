import React, { useState, useRef } from 'react';
import SVGIcon from '@/components/common/svg-icon/SVGIcon';
import Card from '@/components/common/Card';
import useClickOutside from '@/hooks/useClickOutside'

/**
 * 
 * @param {string} hintText - Help text to be displayed initially
 * @param {number} selected - index of the element in the array
 * @param {Array} options  - Array of strings or number
 * @param {boolean} error - displays red border if true, to indicate invalidity
 */
const Listbox = (props) => {

    let [open, setOpen] = useState(false);

    let wrapper = useRef("wrapper")

    useClickOutside(wrapper, () => {setOpen(false);});

    function selectHandler(index){
        props.onSelect(index);
        setOpen(false);
    }

    return (
        <div className='relative' ref={wrapper}>
            <div onClick={() => setOpen(!open)} className={`flex items-center justify-between cursor-pointer border rounded font-medium border-primary-300 p-2 ${open && "border-primary-600"} ${props.error && "border-danger"}`}>
                <p className='text-sm text-primary-600'>{props.selected != null ? props.options[props.selected] : props.hintText}</p>
                <SVGIcon className='w-6 h-6' icon={open ? 'angle-up' : 'angle-down'} /> 
            </div>
            {open && <Card className='absolute overflow-hidden top-full left-0 w-full'>
                {
                    props.options.map((option, index) => {
                        return <p key={index} onClick={() => selectHandler(index)} className='cursor-pointer text-sm px-2 py-2 hover:text-primary-100 hover:bg-secondary'>{option}</p>
                    }) 
                }
            </Card>}
        </div>
    );
}

export default Listbox;