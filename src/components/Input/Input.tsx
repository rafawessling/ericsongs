import { InputText } from 'primereact/inputtext';
import { ComponentProps } from 'react';
import { inputIcons } from '../../utils/inputIcons';

interface InputProps extends ComponentProps<'input'> {
    endAdornment?: keyof typeof inputIcons;
    onIconClick?: () => void;
}

export const Input = ({ endAdornment, onIconClick, ...props }: InputProps) => {
    const EndAdornmentIcon = endAdornment ? inputIcons[endAdornment] : null;

    return (
        <div className="card flex flex-col justify-content-center w-full p-float-label">
            <InputText
                {...props}
                id={props.id}
                value={props.value?.toString()}
                placeholder={props.placeholder}
                className={`${
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
