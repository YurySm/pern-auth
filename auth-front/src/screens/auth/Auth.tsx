'use client'
import {FC, useEffect, useState} from "react";
import { useAuth } from "@/hooks/useAuth";
import { IEmailPassword } from "@/store/user/user.interface";
import { validEmail } from "@/screens/auth/validEmail";
import { useAuthRedirect } from "@/screens/auth/useAuthRedirect";
import {SubmitHandler,useForm} from "react-hook-form";
import Button from "@/components/UI/button/Button";
import Field from "@/components/UI/input/Field";
import {useActions} from "@/store/hooks";
import Loader from "@/components/UI/loader/Loader";

const Auth: FC = () => {

    useAuthRedirect()

    const { isLoading, isError } = useAuth()

    const { login, register, clearError } = useActions()

    const [type, setType] = useState<'login' | 'register'>('login');

    const { register: formRegister,
        handleSubmit,
        formState: { errors },
        reset } = useForm<IEmailPassword>({
            mode: 'onChange'
        })

    const onSubmit: SubmitHandler<IEmailPassword> = (data) => {
        if (type === 'login') {
            login(data)
        } else {
            register(data)
        }
        reset()
    }

    useEffect(() => {
        if( isError) {
            const timer = setTimeout(() => {
                clearError()
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [isError])

    return (
        <section className={'flex h-screen justify-center items-center'}>
            <form
                className={'rounded-lg shadow-sm p-8 m-auto w-1/3'}
                onSubmit={handleSubmit(onSubmit)}>

                <h1 className={`font-semibold text-3xl capitalize text-center mb-4`}>{type}</h1>

                {isLoading ? <Loader/> : null}

                {isError ? <h2 className={`font-semibold text-xl capitalize text-center mb-4`}>{isError}</h2>: null}

                <Field
                    {...formRegister('email', {
                        required: 'Email is required!',
                        pattern: {
                            value: validEmail,
                            message: 'Please enter valid email address'
                        }
                    })}
                    placeholder={'Email'}
                    error={errors.email?.message}
                />

                <Field
                    {...formRegister('password', {
                        required: 'Password is required!',
                        minLength: {
                            value: 6,
                            message: 'Min length should more 6 symbols'
                        }
                    })}
                    placeholder={'Password'}
                    error={errors.password?.message}
                    type={'password'}
                />


                <div className="flex justify-between">
                    <Button
                        type={'submit'}
                        variant={'orange'}>Let's go!
                    </Button>
                    <button
                        type={'button'}
                        className={'opacity-50 hover:opacity-100 transition-all px-9'}
                        onClick={() => setType(type === 'login' ? 'register' : 'login')}>
                        {type === 'login' ? 'Register' : 'Login'}
                    </button>
                </div>
            </form>
        </section>
    );
};
export default Auth;