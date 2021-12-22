import React from 'react';
import TextField from '../../components/input/TextField';
import BaseButton from '../../components/button/BaseButton';
import Card from '../../components/common/Card';

function ResetPassword() {
    return (
        <section className="container mx-auto flex items-center justify-center h-screen">
            <Card className="flex flex-col gap-y-4" style={{width: 400+'px'}}>
                <h1 className="font-bold text-2xl mb-1">Password Reset 🔐</h1>
                <TextField placeHolder="New Password"/>
                <TextField placeHolder="Confirm New Password"/>
                <p className="text-sm text-gray-500 font-medium">Your new password must be different from the password used before.</p>
                <BaseButton label="RESET NOW"/>
            </Card>
        </section>
    )
}

export default ResetPassword;