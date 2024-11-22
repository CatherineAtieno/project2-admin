import PageLayout from "../components/layouts/Page.layout.tsx";
import {Chip, Table, TextInput} from "@mantine/core";
import {BiSearch} from "react-icons/bi";
import AddPlace from "../components/AddPlace.tsx";
import {useStore} from "zustand";
import useBusinessStore from "../stores/business.store.ts";
import {useCallback, useContext, useMemo, useState} from "react";
import {DataContext} from "../context/Data.Context.tsx";
import {Route, Routes, useNavigate} from "react-router-dom";
import ViewPlace from "../components/ViewPlace.tsx";


export default function PlacesPage() {
    const {businesses} = useContext(DataContext)
    const {funPlaces, hotel, restaurants} = useStore(useBusinessStore)
    const [search, setSearch] = useState("")
    const [filters, setFilters] = useState<{ [key: string]: boolean }>({
        hotel: false,
        restaurants: false,
        "fun place": false,
    })

    const handleFilters = useCallback((list: Map<string, BusinessObjFrmDb>) => {
        const hold = new Map([...list])
        const isFiltered = Object.values(filters).filter(f => f).length > 0

        if (search.length > 2 || isFiltered) {
            for (const [key, value] of hold) {
                if (search.length > 2)
                    if (!JSON.stringify(value).toLowerCase().includes(search.toLowerCase()))
                        hold.delete(key)

                for (const fKey of Object.keys(filters))
                    if (!filters[fKey])
                        if (value.kind.toLowerCase() === fKey.toString())
                            hold.delete(key)
            }
        }
        return hold
    }, [filters, search])
    const navigate = useNavigate()

    const places = useMemo(() => {
        const fromInitial = new Map([...hotel, ...restaurants, ...funPlaces])
        const list = fromInitial.size === businesses.size
            ? fromInitial
            : businesses
        return handleFilters(list)
    }, [businesses, funPlaces, handleFilters, hotel, restaurants])


    return (
        <PageLayout pageName={"Places"} className={'h-full space-y-2'}>
            <div className={'flex gap-2 p-2 bg-white z-20 sticky top-0'}>
                <TextInput
                    value={search} onChange={({target: {value}}) => setSearch(value)}
                    type={'search'}
                    leftSection={<BiSearch/>} placeholder={"Find place"}
                    className={'border !bg-white'}
                />
                <Chip onChange={checked => setFilters(p => ({...p, hotel: checked}))} variant={'outline'} size={'md'}>
                    Hotel
                </Chip>
                <Chip onChange={checked => setFilters(p => ({...p, restaurants: checked}))} variant={'outline'}
                      size={'md'}>
                    Restaurant
                </Chip>
                <Chip onChange={checked => setFilters(p => ({...p, funPlaces: checked}))} variant={'outline'}
                      size={'md'}>
                    Fun place
                </Chip>
            </div>
            <div className={'flex h-full gap-2'}>
                <Table striped withRowBorders highlightOnHover className={'w-2/3 h-max bg-white p-2'}>
                    <Table.Thead className={'sticky top-[50px] bg-white'}>
                        <Table.Tr>
                            <Table.Th>No.</Table.Th>
                            <Table.Th>Name</Table.Th>
                            <Table.Th>Kind</Table.Th>
                            <Table.Th>Phone</Table.Th>
                            <Table.Th>Email</Table.Th>
                            <Table.Th>Location</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {[...places.values()].map((biz, i) =>
                            <Table.Tr
                                key={biz.id}
                                className={'cursor-pointer'}
                                onClick={()=>navigate(`./${biz.kind}/${biz.id}`)}
                            >
                                <Table.Td>{i + 1}</Table.Td>
                                <Table.Td>{biz.name}</Table.Td>
                                <Table.Td>{biz.kind}</Table.Td>
                                <Table.Td>{biz.phone}</Table.Td>
                                <Table.Td>{biz.email}</Table.Td>
                                <Table.Td>{biz.address.town}</Table.Td>
                            </Table.Tr>
                        )}
                    </Table.Tbody>
                </Table>
                <Routes>
                    <Route path={'/:category/:place_id?'} element={<ViewPlace places={places} />} />
                </Routes>
            </div>
            <AddPlace/>
        </PageLayout>
    )
}

