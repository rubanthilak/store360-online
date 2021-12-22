import React from 'react';

function Card(params) {
    return (
        <div style={params.style} className={`shadow-lg p-8 ${params.className}`}>
            {params.children}
        </div>
    )
}

export default Card;