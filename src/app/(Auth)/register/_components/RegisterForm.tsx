'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod';
import useAuth from "@/auth/hooks/useAuth";
import { useState } from "react";
import LoadingIcon from "@/components/LoadingIcon";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

interface Props {
    emailLabel: string;
    emailPlaceholder: string;
    emailTakenError:string;
    passwordLabel: string;
    passwordPlaceholder: string;
    firstNameLabel: string;
    firstNamePlaceholder: string;
    lastNameLabel: string;
    lastNamePlaceholder: string;
    userNameLabel: string;
    userNamePlaceholder: string;
    passwordConfirmLabel: string;
    passwordConfirmPlaceholder: string;
    loginErrorMess: string;
    wrongPasswordError: string;
    onMatchPasswordError: string;
    wrongEmailError: string;
    wrongFirstNameError: string;
    wrongLastNameError: string;
    wrongUserNameError: string;
    loginButton: string;
}


const GetRegisterFormSchema = (emailError: string, passError: string, fnError: string, lsError: string, unError: string, matchError: string) => {
    return z.object({
        email: z.string().email(emailError),
        firstName: z.string().min(3, fnError),
        lastName: z.string().min(3, lsError),
        userName: z.string().min(5, unError),
        password: z.string().min(6, passError),
        passwordConfirm: z.string()
    }
    ).refine(data => data.password === data.passwordConfirm, { message: matchError,path:['passwordConfirm'] })
};


type RegisterFormType = { email: string, password: string,passwordConfirm:string , userName: string, firstName: string, lastName: string };


export default function RegisterForm({ loginButton,emailTakenError, firstNameLabel, firstNamePlaceholder, lastNameLabel, lastNamePlaceholder, userNameLabel, userNamePlaceholder, passwordConfirmLabel,passwordConfirmPlaceholder , onMatchPasswordError, wrongFirstNameError, wrongLastNameError, wrongUserNameError, emailLabel, emailPlaceholder, passwordLabel, passwordPlaceholder, loginErrorMess, wrongEmailError, wrongPasswordError }: Props) {
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormType>({
        resolver: zodResolver(
            GetRegisterFormSchema(
                wrongEmailError,
                wrongPasswordError,
                wrongFirstNameError,
                wrongLastNameError,
                wrongUserNameError,
                onMatchPasswordError,
            ))
    })
    const { methods: { register:registerAuth, authenticate , login } } = useAuth();
    const { replace } = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [loginError, setLoginError] = useState('');

    const registerHandler: SubmitHandler<RegisterFormType> = async (data) => {
        setLoginError('');
        setIsLoading(true);
        try {
            await registerAuth(
                {
                    email:data.email,
                    firstName:data.firstName,
                    lastName:data.lastName,
                    userName:data.userName,
                    password:data.password
            });
            replace('/');
            login({
                email:data.email,
                password:data.password
            });
            authenticate();
        } catch(e:any){
            if(e.response.status === 409){
                setLoginError(emailTakenError);
            }else{
                setLoginError(loginErrorMess);
            }
        }
        setIsLoading(false);
    }

    return (<form onSubmit={handleSubmit(registerHandler)}>
        {/* First Name And Last Name */}
        <div className="flex items-center justify-between gap-6">

            <div className="w-1/2 flex flex-col gap-2 mb-4">
                <Label className="text-sm text-muted-foreground" htmlFor="firstname">{firstNameLabel}</Label>
                <Input
                    {...register('firstName', { required: true })}

                    id="firstname"
                    disabled={isLoading}
                    className="w-full"
                    placeholder={firstNamePlaceholder}
                />

                {
                    errors.firstName ?
                        <div className="w-full p-2 rounded-md text-sm text-red-600 bg-red-500/20">{errors.firstName?.message}</div>
                        : null
                }

            </div>

            <div className="w-1/2 flex flex-col gap-2 mb-4">
                <Label className="text-sm text-muted-foreground" htmlFor="lastname">{lastNameLabel}</Label>
                <Input
                    {...register('lastName', { required: true })}
                    id="lastname"
                    disabled={isLoading}
                    className="w-full"
                    placeholder={lastNamePlaceholder}
                />
                {
                    errors.lastName ?
                        <div className="w-full p-2 rounded-md text-sm text-red-600 bg-red-500/20">{errors.lastName?.message}</div>
                        : null
                }
            </div>

        </div>
        
        {/* UserName */}
        <div className="w-full flex flex-col gap-2 mb-4">
            <Label className="text-sm text-muted-foreground" htmlFor="username">{userNameLabel}</Label>
            <Input
                {...register('userName', { required: true })}
                id="username"
                disabled={isLoading}
                className="w-full"
                placeholder={userNamePlaceholder} />
        </div>

        {
            errors.userName ?
                <div className="w-full p-2 rounded-md text-sm text-red-600 bg-red-500/20 -mt-2 mb-2">{errors.userName?.message}</div>
                : null
        }

        {/* EMAIL */}
        <div className="w-full flex flex-col gap-2 mb-4">
            <Label className="text-sm text-muted-foreground" htmlFor="email">{emailLabel}</Label>
            <Input
                {...register('email', { required: true })}
                type="email"
                id="email"
                disabled={isLoading}
                className="w-full"
                placeholder={emailPlaceholder} />
        </div>

        {
            errors.email ?
                <div className="w-full p-2 rounded-md text-sm text-red-600 bg-red-500/20 -mt-2 mb-2">{errors.email?.message}</div>
                : null
        }   

        {/* PASSWORD */}
        <div className="w-full flex flex-col gap-2 mb-4">
            <Label className="text-sm text-muted-foreground" htmlFor="password">{passwordLabel}</Label>
            <Input
                {...register('password', { required: true })}
                type="password"
                id="password"
                disabled={isLoading}
                className="w-full"
                placeholder={passwordPlaceholder} />
        </div>

        {
            errors.password ?
                <div className="p-2 rounded-md text-sm text-red-600 bg-red-500/20 -mt-2 mb-2">{errors.password?.message}</div>
                : null
        }

        {/* CONFIRM PASSWORD */}
        <div className="w-full flex flex-col gap-2 mb-4">
            <Label className="text-sm text-muted-foreground" htmlFor="conPass">{passwordConfirmLabel}</Label>
            <Input
                {...register('passwordConfirm', { required: true })}
                type="password"
                id="conPass"
                disabled={isLoading}
                className="w-full"
                placeholder={passwordConfirmPlaceholder} />
        </div>

        {
            errors.passwordConfirm ?
                <div className="p-2 rounded-md text-sm text-red-600 bg-red-500/20 -mt-2 mb-2">{errors.passwordConfirm?.message}</div>
                : null
        }

        {/* LOGIN ERROR */}
        {
            loginError ?
                <div className="p-2 rounded-md text-sm text-red-600 bg-red-500/20 my-2">{loginError}</div>
                : null
        }

        <Button disabled={isLoading} className="w-full" type="submit">
            {
                isLoading ? <LoadingIcon /> : loginButton
            }
        </Button>

    </form>)

}