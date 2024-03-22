'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import RegisterForm from "./RegisterForm";
import useAuth from "@/auth/hooks/useAuth";


interface TextDataType {
    title: string;
    description: string;
    noAccount: string;
    register: string;
    or: string
    googleLogin: string;
    form: {
        firstNameLabel: string;
        firstNamePlaceholder: string;
        lastNameLabel: string;
        lastNamePlaceholder: string;
        userNameLabel: string;
        userNamePlaceholder: string;
        wrongEmailError: string;
        wrongPasswordError: string;
        noMatchPasswordError: string;
        wrongFirstNameError: string;
        wrongLastNameError: string;
        wrongUserNameError: string;
        loginError: string; emailLabel: string;
        emailPlaceholder: string; passwordLabel: string;
        emailTakenError:string;
        passwordConfirmLabel: string;
        passwordConfirmPlaceholder: string;
        passwordPlaceholder: string;
        loginButton: string;
    };
}

interface Props {
    text: TextDataType
}

export default function RegisterCard({ text: { title, or, description, googleLogin, noAccount, register, form } }: Props) {
    const { methods: { loginOAuth } } = useAuth()

    return (<Card className="w-full md:w-[39em] ">

        <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
        </CardHeader>

        <CardContent>
            <RegisterForm
                loginButton={form.loginButton}
                wrongEmailError={form.wrongEmailError}
                wrongPasswordError={form.wrongPasswordError}
                onMatchPasswordError={form.noMatchPasswordError}
                wrongFirstNameError={form.wrongFirstNameError}
                wrongLastNameError={form.wrongLastNameError}
                wrongUserNameError={form.wrongUserNameError}
                loginErrorMess={form.loginError}
                emailLabel={form.emailLabel}
                emailPlaceholder={form.emailPlaceholder}
                emailTakenError={form.emailTakenError}
                passwordLabel={form.passwordLabel}
                passwordPlaceholder={form.passwordPlaceholder}
                passwordConfirmLabel={form.passwordConfirmLabel}
                passwordConfirmPlaceholder={form.passwordConfirmPlaceholder}
                firstNameLabel={form.firstNameLabel}
                firstNamePlaceholder={form.firstNamePlaceholder}
                lastNameLabel={form.lastNameLabel}
                lastNamePlaceholder={form.lastNamePlaceholder}
                userNameLabel={form.userNameLabel}
                userNamePlaceholder={form.userNamePlaceholder}
            />
        </CardContent>

        <CardContent className="w-full flex gap-2 items-center">
            <div className="w-1/2 h-[2px] bg-border" />
            <span className="text-base text-muted-foreground">{or}</span>
            <div className="w-1/2 h-[2px] bg-border" />
        </CardContent>

        <CardContent>
            <Button onClick={() => loginOAuth('google')} variant="outline" className="w-full flex justify-center items-center gap-2">
                <FcGoogle className="w-5 h-5" />{googleLogin}
            </Button>
        </CardContent>

        <CardFooter>
            <p className="text-muted-foreground text-sm">
                {noAccount} <Link href='/login' className="text-primary">{register}</Link>
            </p>
        </CardFooter>

    </Card>)
}