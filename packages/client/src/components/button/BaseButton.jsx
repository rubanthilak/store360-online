import React from 'react';

function BaseButton(params) {
    return (
        <button onClick={params.onClick} className="bg-blue-600 active:bg-blue-400 text-white font-medium py-2">{params.label}</button>
    )
}

export default BaseButton;