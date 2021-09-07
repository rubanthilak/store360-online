import React from 'react';

function Card(params) {
    return (
        <div className={`shadow-lg p-6 ${params.className}`}>
            {params.children}
        </div>
    )
}

export default Card;