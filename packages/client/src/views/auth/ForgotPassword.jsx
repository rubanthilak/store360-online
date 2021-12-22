import React from 'react';
import TextField from '../../components/input/TextField';
import BaseButton from '../../components/button/BaseButton';
import Card from '../../components/common/Card';

function ForgotPassword() {
    return (
        <section className="container mx-auto flex items-center justify-center h-screen">
            <Card className="flex flex-col gap-y-4" style={{width: 400+'px'}}>
                <h1 className="font-bold text-2xl mb-1">Forgot Password 😅</h1>
                <TextField placeHolder="Enter Email"/>
                <p className="text-sm text-gray-500 font-medium">Link to reset your password will be sent to this Email address.</p>
                <BaseButton label="CONFIRM EMAIL"/>
            </Card>
        </section>
    )
}

export default ForgotPassword;