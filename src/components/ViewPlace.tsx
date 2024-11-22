import {useParams} from "react-router-dom";
import {Image, Space, Table, Text, Title} from "@mantine/core";
import {useMemo} from "react";
import {showLabel} from "../libs/methods.ts";

interface props {
    places: Map<string, BusinessObjFrmDb>
}

export default function ViewPlace({places}: props) {
    const param = useParams()
    const titles = ["name", "kind", "phone", "email", "address", "transport", "services"]

    const place = useMemo(() => {
        try {
            // const {funPlaces, hotels, restaurants} = useBusinessStore.getState()
            // const places: {[key: string]: Map<string, BusinessObj>} = {funPlaces, hotels, restaurants}
            if (!param || !param.category || !param.place_id)
                return null
            const found = places.get(param.place_id)
            return found ? found : null
        } catch (_err) {
            console.log("Er: ", _err)
            return null
        }
    }, [param, places])
    return place
        ? (
            <div className={'flex-1 bg-white p-2'}>
                <Title size={22}>{place.name}</Title>
                <Text size={'sm'}>{place.kind}</Text>
                <hr/>
                <Space m={5}/>
                <div className={'columns-3'}>
                    {place.images.map(img =>
                        <div className={'w-full'} key={img?.id}>
                            <Image className={'w-full h-full'} src={img.img} alt={''}/>
                        </div>
                    )}
                </div>
                <Table className={'w-[400px]'}>
                    <Table.Tbody>
                        <Table.Tr className={'columns-2'}>
                            {titles.map((title, i) => {
                                const val = place[title]

                                if (!val)
                                    return <div className={'border'} key={i}>
                                        <Table.Th>{showLabel(title)}</Table.Th>
                                        <Table.Td></Table.Td>
                                    </div>
                                if (typeof val === 'string')
                                    return <div className={'border'} key={i}>
                                        <Table.Th>{showLabel(title)}</Table.Th>
                                        <Table.Td>{val}</Table.Td>
                                    </div>
                                if (Array.isArray(val))
                                    return <div className={'border'} key={i}>
                                        <Table.Th>{showLabel(title)}</Table.Th>
                                        <Table.Td>{
                                            val.map((child) => {
                                                return Object.keys(child).map((ch, u) => {
                                                    const val = child[ch]
                                                    const show = ["id", 'place', 'business']
                                                    if (!show.includes(ch))
                                                        return <span className={"flex gap-2 flex-wrap"} key={u}>
                                                            <Text className={"font-bold"}>{showLabel(ch)}</Text>
                                                            <Text>{typeof val === 'object' ? "" : val}</Text>
                                                            </span>
                                                })
                                            })
                                        }</Table.Td>
                                    </div>
                                return <div className={'border'} key={i}>
                                    <Table.Td className={'grid text-left'} key={i}>
                                        <Table.Th className={'text-left pl-0'}>{showLabel(title)}</Table.Th>
                                        {Object.keys(val).map((key, x) => {
                                            const subVal = val[key]
                                            if (typeof subVal === 'string')
                                                return <span className={'flex gap-2'} key={x}>
                                                    <Text className={'font-bold'}>{showLabel(key)}: </Text>
                                                    <Text className={'truncate'}>{subVal}</Text>
                                            </span>
                                        })}
                                    </Table.Td>
                                </div>
                            })}
                        </Table.Tr>
                    </Table.Tbody>
                </Table>
            </div>
        ) :
        (
            <div className={'flex-1 h-full bg-white p-2'}>
                <Title size={22}>Oops</Title>
                <Text className={'m-auto p-5 text-tertiary-300'}>Place not found, please refresh and try again!</Text>
            </div>
        )
}

