import { useState } from 'react';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { Title } from '../Title/Title';

interface FormProps {
    type: string;
    title: string;
    subtitle: string;
    className?: string;
}

export const Form = ({ type, title, subtitle, className }: FormProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const isSignUp = type === 'signup';

    const handlePassword = (
        setPassword: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
        return () => setPassword(prevState => !prevState);
    };

    return (
        <form
            className={`flex flex-col justify-start align-center gap-10 md:gap-12 z-20 w-full md:w-4/5 min-[390px]:py-8 ${className}`}
        >
            <div className="flex flex-col gap-2">
                <Title>{title}</Title>
                <p className="text-lg">{subtitle}</p>
            </div>
            <div
                className={`flex flex-col gap-6 md:gap-8 w-full ${
                    isSignUp ? 'lg:gap-4 xl:gap-6' : ''
                }`}
            >
                {isSignUp && <Input id="name" placeholder="Name" type="text" />}
                <Input id="email" placeholder="Email" type="email" />
                <Input
                    id="password"
                    placeholder="Password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={showPassword ? 'EyeOff' : 'Eye'}
                    onIconClick={handlePassword(setShowPassword)}
                />
                {isSignUp && (
                    <Input
                        id="confirmPassword"
                        placeholder="Confirm password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        endAdornment={showConfirmPassword ? 'EyeOff' : 'Eye'}
                        onIconClick={handlePassword(setShowConfirmPassword)}
                    />
                )}
            </div>
            <Button type="submit">Sign Up</Button>
            <p className="text-center">
                Do not have an account?{' '}
                <span className="py-3 px-1 cursor-pointer text-blue-500 underline">
                    Sign up
                </span>
            </p>
        </form>
    );
};
