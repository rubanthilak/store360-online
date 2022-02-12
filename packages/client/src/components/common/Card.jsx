import React from 'react';

function Card(params) {
    return (
        <div style={params.style} className={`shadow-md rounded bg-primary-100 ${params.className}`}>
            {params.children}
        </div>
    )
}

export default Card;