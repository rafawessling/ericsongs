import { ComponentProps } from 'react';
import { inputIcons } from '../../utils/inputIcons';

export interface InputProps extends ComponentProps<'input'> {
    startAdornment?: keyof typeof inputIcons;
    endAdornment?: keyof typeof inputIcons;
    onIconClick?: () => void;
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    className?: string;
}
