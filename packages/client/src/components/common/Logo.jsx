import React from 'react';
import Img from "@/assets/logo.png"

function Logo(props) {
    return (
        <div>
            <img src={Img} alt="Logo" className={`w-32 sm:w-40 mx-auto ${props.className}`}/>
        </div>
    )
}

export default Logo;