interface ButtonProps {
    children: string;
}

export const Button = ({ children }: ButtonProps) => {
    return (
        <button className="py-2.5 px-4 font-light rounded-3xl text-zinc-50 bg-blue-500 hover:bg-blue-600">
            {children}
        </button>
    );
};
