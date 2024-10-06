import { InputText } from 'primereact/inputtext';
import { ComponentProps } from 'react';
import { inputIcons } from '../../utils/inputIcons';

interface InputProps extends ComponentProps<'input'> {
    startAdornment?: keyof typeof inputIcons;
    endAdornment?: keyof typeof inputIcons;
    onIconClick?: () => void;
    className?: string;
}

export const Input = ({
    startAdornment,
    endAdornment,
    onIconClick,
    className,
    ...props
}: InputProps) => {
    const StartAdornmentIcon = startAdornment ? inputIcons[startAdornment] : null;
    const EndAdornmentIcon = endAdornment ? inputIcons[endAdornment] : null;

    return (
        <div
            className={`${className} card flex flex-col justify-content-center w-full p-float-label`}
        >
            {StartAdornmentIcon && (
                <StartAdornmentIcon
                    onClick={onIconClick}
                    className="absolute left-4 top-1/4 size-5 text-zinc-200"
                />
            )}
            <InputText
                {...props}
                id={props.id}
                value={props.value?.toString()}
                placeholder={props.placeholder}
                className={`${startAdornment ? 'pl-12' : ''} ${
                    endAdornment ? 'pr-12' : ''
                } w-full py-2.5 px-4 font-light rounded-3xl text-zinc-50 bg-gray-800 placeholder:text-zinc-300 focus:outline-none focus:ring-1 focus:ring-gray-700`}
            />
            {EndAdornmentIcon && (
                <EndAdornmentIcon
                    onClick={onIconClick}
                    className="absolute right-4 top-1/4 size-5 text-zinc-200"
                />
            )}
        </div>
    );
};
