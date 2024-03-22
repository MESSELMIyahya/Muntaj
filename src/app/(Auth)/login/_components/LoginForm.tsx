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

interface Props {
    emailLabel: string;
    emailPlaceholder: string;
    passwordLabel: string;
    passwordPlaceholder: string;
    loginErrorMess:string;
    wrongPasswordError:string;
    wrongEmailError:string;
    loginButton:string;
}


const GetLoginFormSchema = (emailError:string,passError:string)=>{
    return z.object({
        email: z.string().email(emailError),
        password: z.string().min(6,passError)
    })
};


type LoginFormType = {email:string,password:string} ;


export default function LoginForm({ loginButton,emailLabel, emailPlaceholder, passwordLabel, passwordPlaceholder , loginErrorMess ,wrongEmailError,wrongPasswordError }: Props) {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormType>({ resolver: zodResolver(GetLoginFormSchema(wrongEmailError,wrongPasswordError)) })
    const { methods: { login ,authenticate } } = useAuth();
    const { replace } = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [loginError, setLoginError] = useState('');

    const loginHandler: SubmitHandler<LoginFormType> = async (data) => {
        setLoginError('');
        setIsLoading(true);
        try {
            await login(data);
            replace('/');
            authenticate();
        } catch {
            setLoginError(loginErrorMess);
        }
        setIsLoading(false);
    }

    return (<form onSubmit={handleSubmit(loginHandler)}>

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

        <div className="w-full flex flex-col gap-2 mb-4">
            <Label className="text-sm text-muted-foreground" htmlFor="email">{passwordLabel}</Label>
            <Input
                {...register('password', { required: true })}
                type="password"
                id="email"
                disabled={isLoading}
                className="w-full"
                placeholder={passwordPlaceholder} />
        </div>

        {
            errors.password ?
                <div className="p-2 rounded-md text-sm text-red-600 bg-red-500/20 -mt-2 mb-2">{errors.password?.message}</div>
                : null
        }

        {
            loginError ?
                <div className="p-2 rounded-md text-sm text-red-600 bg-red-500/20 my-2">{loginError}</div>
                : null
        }

        <Button disabled={isLoading} className="w-full" type="submit">
            {
                isLoading ? <LoadingIcon/> : loginButton
            }
        </Button>

    </form>)

}