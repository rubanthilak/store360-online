import React from 'react';

function BaseButton(params) {
    return (
        <button className="bg-blue-600 text-white font-bold py-1">{params.label}</button>
    )
}

export default BaseButton;