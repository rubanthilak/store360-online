import React from 'react';

function Badge(props) {
    const {max, appearance, children} = props;
    return (
       <span className='text-xs bg-primary-500 text-primary-100 rounded-md px-2'>{
            max 
            ? (max < children) ? (max+"+") : children
            : children 
        }</span>
    )
}

export default Badge;