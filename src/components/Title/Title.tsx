import { ReactNode } from 'react';

interface TitleProps {
    children: ReactNode;
}

export const Title = ({ children }: TitleProps) => {
    return <h1 className="text-[28px] lg:text-[32px] font-semibold">{children}</h1>;
};
