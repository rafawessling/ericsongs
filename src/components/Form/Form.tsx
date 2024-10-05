import { useState } from 'react';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { Title } from '../Title/Title';

export const Form = () => {
    const [showPassword, setShowPassword] = useState(false);

    const handlePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <form className="flex flex-col justify-start align-center gap-10 md:gap-12 w-full md:w-4/5  p-6 m-8">
            <div className="flex flex-col gap-2">
                <Title>Sign In</Title>
                <p className="text-lg">Enter yout credentials to access your account.</p>
            </div>
            <div className="flex flex-col gap-6 md:gap-8 w-full">
                <Input id="email" placeholder="Email" type="email" />
                <Input
                    id="password"
                    placeholder="Password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={showPassword ? 'EyeOff' : 'Eye'}
                    onIconClick={handlePassword}
                />
            </div>
            <Button type="submit">Sign In</Button>
            <p className="text-center mt-5">
                Do not have an account?{' '}
                <span className="py-3 px-1 cursor-pointer text-blue-500 underline">
                    Sign up
                </span>
            </p>
        </form>
    );
};
