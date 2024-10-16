import { TitleProps } from './TitleTypes';

export const Title = ({ children }: TitleProps) => {
    return <h1 className="text-[28px] lg:text-[32px] font-semibold">{children}</h1>;
};
