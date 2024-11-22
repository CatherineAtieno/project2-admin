import {ActionIcon, TextInput} from "@mantine/core";
import {MdAdd} from "react-icons/md";
import React, {useState} from "react";


interface props {
    addService: (service: ServiceObj) => void;
}

export default function AddService({addService}: props) {
    const [service, setService] = useState<ServiceObj>({
        id: "",
        name: "",
        price: 0,
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setService(prev => ({...prev, [e.target.name]: e.target.value}));
    }
    return (
        <div className={'flex gap-2'}>
            <TextInput
                placeholder={'Service'}
                className={'w-[80%]'}
                name={'name'}
                value={service.name}
                onChange={handleChange}
            />
            <TextInput
                placeholder={'Price'}
                type={'number'}
                name={'price'}
                value={service.price}
                onChange={handleChange}
            />
            <ActionIcon onClick={()=>addService(service)} size={'lg'} >
                <MdAdd />
            </ActionIcon>
        </div>
    )
}

