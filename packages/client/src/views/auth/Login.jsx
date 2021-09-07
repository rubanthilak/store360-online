import React from 'react';
import TextField from '../../components/input/TextField';
import BaseButton from '../../components/button/BaseButton';
import Card from '../../components/common/Card';

function Login() {
    return (
        <section className="flex items-center justify-center h-screen">
            <Card className="flex flex-col w-1/4 gap-y-4">
                <h1 className="font-bold text-2xl mb-2">Welcome Back !</h1>
                <TextField placeHolder="Username"/>
                <TextField placeHolder="Password"/>
                <a href="" className="text-xs text-gray-400 hover:text-blue-500 font-medium">Forgot Password ?</a>
                <BaseButton label="Login"/>
            </Card>
        </section>
      
    )
}

export default Login;