import {Button, PasswordInput, TextInput, Title} from "@mantine/core";
import bg from '../assets/nrb.jpg'
import React, {useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {loginQuery} from "../libs/queries.ts";
import {notifications} from "@mantine/notifications";
import {showError} from "../libs/methods.ts";
import {useNavigate} from "react-router-dom";

export default function AuthPage() {
    const [form, setForm] = useState({
        userName: "",
        password: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prev => ({...prev, [e.target.name]: e.target.value}))
    }
    const navigate = useNavigate();

    const {mutate, isPending} = useMutation({
        mutationKey: ['authorization'],
        mutationFn: () => loginQuery(form),
        onSuccess: (res) => {
            notifications.show({title: "Success!", message: res.data.message})
            navigate("/")
        },
        onError: (err) => {
            notifications.show(showError(err))
        },
        retry: false,
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        mutate()
    }


    return (
        <div style={{backgroundImage: `url(${bg})`}}
             className={'w-full h-[100vh] bg-no-repeat bg-cover bg-bottom flex'}>
            <div className={'w-full h-full bg-gradient-to-tr from-black absolute z-0'}/>
            <div className={'max-w-[300px] bg-white m-auto z-10 text-secondary-900 h-max p-4 grid gap-2'}>
                <Title size={'28px'} className={'!font-black'}>
                    MAGICAL SMART NAIROBI
                </Title>
                <Title size={'22px'} className={''}>
                    Login
                </Title>
                <form onSubmit={handleSubmit} className={'w-full grid gap-2'}>
                    <TextInput
                        placeholder={'Username'}
                        className={'w-full'}
                        name={'userName'}
                        value={form.userName}
                        onChange={handleChange}
                    />
                    <PasswordInput
                        placeholder={'Password'}
                        className={'w-full'}
                        name={'password'}
                        value={form.password}
                        onChange={handleChange}
                    />
                    <Button type={'submit'} loading={isPending} disabled={isPending}>
                        Login
                    </Button>
                </form>
            </div>
        </div>
    )
}

