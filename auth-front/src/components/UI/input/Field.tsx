import React, { forwardRef} from 'react';
import cn from "clsx";
import {IField} from "@/components/UI/input/field.interface";

const Field = forwardRef<HTMLInputElement, IField>(
    ({placeholder,
         error,
         className,
         type = 'text',
         style,
         Icon,
         ...rest}, ref) => {
    return (
        <div className={cn('mb-4', className)} style={style}>
            <label>
                <span className={'mb-1 block'}>
                    {Icon && <Icon className={'mr-3'}/>}
                    {placeholder}
                </span>
                <input
                    className={cn('px-4 py-2 w-full outline-none border border-gray border-solid focus:border-primary transition-all rounded-lg text-black', {
                        'border-red': !!error,
                    })}
                    placeholder={placeholder}
                    type={type}
                    ref={ref}
                    {...rest}/>
            </label>
            {error && <div className={'text-red mt-1 text-sm'}>{error}</div>}
        </div>
    );
});

export default Field;
