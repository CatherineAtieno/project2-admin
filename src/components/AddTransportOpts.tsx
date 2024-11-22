import {ActionIcon, Fieldset, Select, TextInput} from "@mantine/core";
import React, {useState} from "react";
import {RiDeleteBin5Fill} from "react-icons/ri";
import {MdAdd} from "react-icons/md";


interface props {
    editOpts: React.Dispatch<React.SetStateAction<BusinessObj>>;
    opts: TransportObj[]
}

export default function AddTransportOpts({editOpts, opts}: props) {
    const [tOpt, setOpt] = useState<TransportObj>({
        type: "Cab",
        stage: "",
    })

    const delTransportOpt = (index: number) => {
        editOpts(prev => ({...prev, transport: [...prev.transport.filter((_o, i)=> i !== index)]}))
    }

    const addTransportOpt = () => {
        if(!tOpt.stage)
            return
        editOpts(prev => ({...prev, transport: [...prev.transport, tOpt]}))
        setOpt(p => ({...p, type: "Matatu", stage: ""}))
    }

    const editSaved = (e:{name: string, value: string}, index: number) => {
        const getChange = (old: TransportObj[], val: TransportObj, i: number) => {
            const hold = [...old]
            hold[i] = val
            return hold
        }
        editOpts(p => ({...p, transport: getChange(p.transport, {...p.transport[index], [e.name]:e.value}, index)}))
    }
    return (
        <Fieldset legend={"Transport options"} className={'grid gap-2'}>
            {opts?.map((opt, i) =>
                <div key={i} className={'flex gap-2'}>
                    <Select
                        name={'type'}
                        value={opt.type}
                        data={["Train", "Matatu", "Cab", "Boda"]}
                        onChange={val => editSaved({name: 'type', value: val??""}, i)}
                    />
                    <TextInput
                        name={'stage'}
                        value={opt.stage}
                        onChange={({target: {name, value}}) => editSaved({name, value}, i)}
                    />
                    <ActionIcon color={'tertiary'} variant={'light'} onClick={() => delTransportOpt(i)}
                                size={'lg'}>
                        <RiDeleteBin5Fill/>
                    </ActionIcon>
                </div>
            )}
            <div className={'flex gap-2'}>
                <Select
                    name={'type'}
                    value={tOpt.type}
                    onChange={val => setOpt(p => ({...p, type: val??""}))}
                    data={["Train", "Matatu", "Cab", "Boda"]}
                />
                <TextInput
                    name={'stage'}
                    placeholder={"Stage name"}
                    value={tOpt.stage}
                    onChange={e => setOpt(p => ({...p, stage: e.target.value }))}
                />
                <ActionIcon onClick={()=>addTransportOpt()} size={'lg'} >
                    <MdAdd />
                </ActionIcon>
            </div>
        </Fieldset>
    )
}
