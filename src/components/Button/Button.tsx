import { ButtonProps } from './ButtonTypes';

export const Button = ({ children, onClick, className }: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={`py-2.5 px-4 w-full rounded-3xl text-zinc-50 bg-blue-500 hover:bg-blue-600 ${className}`}
        >
            {children}
        </button>
    );
};
