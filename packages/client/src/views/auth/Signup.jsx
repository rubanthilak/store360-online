import React from 'react';
import TextField from '../../components/input/TextField';
import BaseButton from '../../components/button/BaseButton';
import Card from '../../components/common/Card';

function Signup() {
    return (
        <section className="flex items-center justify-center h-screen">
            <Card className="flex flex-col w-1/4 gap-y-4">
                <h1 className="font-bold text-2xl mb-2">Hey, Welcome 🎉</h1>
                <TextField placeHolder="Username"/>
                <TextField placeHolder="Email"/>
                <TextField placeHolder="Password"/>
                <BaseButton label="Sign Up!"/>
            </Card>
        </section>
    )
}

export default Signup;