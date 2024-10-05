interface TitleProps {
    children: string;
}

export const Title = ({ children }: TitleProps) => {
    return <h1 className="text-[28px] lg:text-[32px] font-bold">{children}</h1>;
};
