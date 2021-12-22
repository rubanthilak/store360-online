import React from 'react';
import TextField from '../../components/input/TextField';
import BaseButton from '../../components/button/BaseButton';
import Card from '../../components/common/Card';
import { Link } from 'react-router-dom';

function Signup() {
    return (
        <section className="container mx-auto flex items-center justify-center h-screen">
            <Card className="flex flex-col gap-y-4" style={{width: 400+'px'}}>
                <h1 className="font-bold text-2xl mb-1">Hey, Welcome 🎉</h1>
                <TextField placeHolder="Username"/>
                <TextField placeHolder="Email"/>
                <TextField placeHolder="Password"/>
                <TextField placeHolder="Confirm Password"/>
                <p className="text-sm text-gray-500 font-medium">By continuing, I agree to the <span className="text-blue-600"><Link to="/">Terms of Use</Link></span> & <span className="text-blue-600"><Link to="/">Privacy Policy</Link></span></p>
                <BaseButton label="SIGNUP"/>
            </Card>
        </section>
    )
}

export default Signup;