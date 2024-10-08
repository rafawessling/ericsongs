export interface ButtonProps {
    children: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
}
