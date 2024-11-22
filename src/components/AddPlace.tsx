import {ActionIcon, Button, Fieldset, Modal, Select, TextInput} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {BiPlus} from "react-icons/bi";
import AddService from "./AddService.tsx";
import React, {useState} from "react";
import {RiDeleteBin5Fill} from "react-icons/ri";
import ImageUpload from "./ImageUpload.tsx";
import {useMutation} from "@tanstack/react-query";
import {addBusiness} from "../libs/queries.ts";
import {notifications} from "@mantine/notifications";
import {showError} from "../libs/methods.ts";
import {MdAdd} from "react-icons/md";
import AddTransportOpts from "./AddTransportOpts.tsx";


export default function AddPlace() {
    const [opened, {close, toggle}] = useDisclosure();
    const [place, setPlace] = useState<BusinessObj>({
        id: "",
        name: "",
        email: "",
        phone: "",
        address: {
            county: "",
            town: "",
            street: "",
            maps: ""
        },
        kind: "hotel",
        images: [],
        services: [],
        transport: []
    })


    const addService = (service: ServiceObj) => {
        const services = [...place.services]
        // check if it exists
        if (services.find(s => s.name.toLowerCase() == service.name.toLowerCase()))
            return
        services.push(service)
        setPlace(prev => ({...prev, services: services}))
    }

    const delService = (index: number) => {
        const services = place.services.filter((_s, i) => i !== index)
        setPlace(prev => ({...prev, services: services}))
    }
    const {mutate, isPending} = useMutation({
        mutationKey: ['business'],
        mutationFn: () => addBusiness(place),
        onSuccess: (res) => {
            notifications.show({title: "Success!", message: res.data.message})
        },
        onError: (err) => {
            notifications.show(showError(err))
        }
    })
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutate()
    }

    return (
        <>
            <Modal title={'Add new place'} opened={opened} onClose={close}>
                <form onSubmit={handleSubmit} className={'grid gap-2'}>
                    <Select
                        value={place.kind}
                        onChange={value => setPlace(prev => ({...prev, kind: value ?? "hotel"}))}
                        label={'Kind of place'} required placeholder={"Select the kind of place"}
                        data={['Hotel', 'Restaurant', 'Fun place']}
                    />
                    <TextInput
                        label={'Place name'}
                        placeholder={'Enter name of place'}
                        value={place.name}
                        onChange={({target: {value}}) => setPlace(prev => ({...prev, name: value}))}
                    />
                    <TextInput
                        label={'Business email'}
                        type={'email'}
                        placeholder={'business@business.com'}
                        value={place.email}
                        onChange={e => setPlace(prev => ({...prev, email: e.target.value}))}
                    />
                    <TextInput
                        label={"Business phone"}
                        type={'tel'}
                        placeholder={'0230820823'}
                        value={place.phone}
                        onChange={e => setPlace(prev => ({...prev, phone: e.target.value}))}
                    />
                    <Fieldset className={'grid gap-2 md:grid-cols-2'} legend={'Address'}>
                        <TextInput
                            label={"County"}
                            placeholder={'County'}
                            value={place.address.county}
                            onChange={({target: {value}}) => setPlace(prev => ({
                                ...prev,
                                address: {...prev.address, county: value}
                            }))}
                        />
                        <TextInput
                            label={"Town"}
                            placeholder={'Town'}
                            value={place.address.town}
                            onChange={({target: {value}}) => setPlace(prev => ({
                                ...prev,
                                address: {...prev.address, town: value}
                            }))}
                        />
                        <TextInput
                            label={"Street"}
                            placeholder={'Street'}
                            value={place.address.street}
                            onChange={({target: {value}}) => setPlace(prev => ({
                                ...prev,
                                address: {...prev.address, street: value}
                            }))}
                        />
                        <TextInput
                            label={"Map link"}
                            placeholder={'Google map address'}
                            value={place.address.maps}
                            onChange={({target: {value}}) => setPlace(prev => ({
                                ...prev,
                                address: {...prev.address, maps: value}
                            }))}
                        />
                    </Fieldset>
                    <ImageUpload images={place.images} setImages={setPlace}/>
                    <Fieldset legend={"Services"} className={'grid gap-2'}>
                        {place.services.map((service, i) =>
                            <div className={'w-full flex gap-2'} key={i}>
                                <TextInput variant={'unstyled'} className={'w-[80%]'} value={service.name}/>
                                <TextInput 
                                    variant={'unstyled'} value={service.price}  
                                    onChange={e => {
                                        const data = [...place.services]
                                        data[i]["price"] = Number(e.target.value)
                                        setPlace(prev => ({...prev, services: data}))
                                    }}
                                />
                                <ActionIcon color={'tertiary'} variant={'light'} onClick={() => delService(i)}
                                            size={'lg'}>
                                    <RiDeleteBin5Fill/>
                                </ActionIcon>
                            </div>
                        )}
                        <AddService addService={addService}/>
                    </Fieldset>
                    <AddTransportOpts opts={place.transport} editOpts={setPlace}/>
                    <Button loading={isPending} disabled={isPending} leftSection={<MdAdd/>} type={'submit'}>
                        Add
                    </Button>
                </form>
            </Modal>
            <Button leftSection={<BiPlus/>} className={'fixed bottom-5'} variant={'gradient'} radius={'xl'}
                    onClick={toggle}
            >
                Add new place
            </Button>
        </>
    )
}

