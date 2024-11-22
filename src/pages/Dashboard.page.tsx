import PageLayout from "../components/layouts/Page.layout.tsx";
import {Card, Text} from "@mantine/core";
import {useQuery} from "@tanstack/react-query";
import {quickOverview} from "../libs/queries.ts";
import {showLabel} from "../libs/methods.ts";
import {useEffect} from "react";
import useBusinessStore from "../stores/business.store.ts";
import {useStore} from "zustand";


export default function DashboardPage() {
    const {data, isFetched, isSuccess} = useQuery({
        queryKey: ['dashboard'],
        queryFn: quickOverview,
        refetchOnWindowFocus: true,
        retryOnMount: true,
    })
    const saveToStore = useStore(useBusinessStore, (state)=>state.saveToStore)
    const colors = ['bg-secondary-700', 'bg-primary-300', 'bg-tertiary-300', 'bg-green-700']

    useEffect(()=>{
        if(isFetched && isSuccess){
            saveToStore(data?.data)
        }
    }, [data?.data, isFetched, isSuccess, saveToStore])

    return (
        <PageLayout pageName={"Dashboard"}>
            <div className={'grid grid-flow-col gap-5 p-2'}>
                {Object.keys(data?.data ?? {}).map((key, i) =>
                    <Card key={i} className={`text-white cursor-pointer ${colors[i]}`}>
                        <Text className={'text-5xl font-black'}>{data?.data[key].length}</Text>
                        <Text>{showLabel(key)}</Text>
                    </Card>
                )}
            </div>
        </PageLayout>
    )
}

