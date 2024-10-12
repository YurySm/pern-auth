import React, {ButtonHTMLAttributes, FC, PropsWithChildren} from 'react';
import cn from "clsx";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant: 'orange' | 'white'
    size?: 'sm' | 'md'| 'lg'
}

const Button: FC<PropsWithChildren<IButton>> = (
    {children,
    className,
    variant,
    size = 'md',
    ...rest}) => {
    return (
        <button
            {...rest}
            className={cn('rounded-xl font-medium shadow px-9 py-2 transition duration-300 ease-in-out hover:shadow-2xl', {
                'text-white bg-primary': variant === 'orange',
                'text-primary bg-white': variant === 'white',
                'px-5 py-2 text-sm': size === 'sm'
            }, className)}>
            {children}
        </button>
    )
};

export default Button;
