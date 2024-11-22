import React, {createContext} from "react";
import {useQuery} from "@tanstack/react-query";
import {fetchBizOrUsers} from "../libs/queries.ts";


export const DataContext = createContext<DataContextObj>({
    users: new Map(),
    businesses: new Map(),
});


export const DataContextProvider = ({children}: { children: React.ReactNode }) => {
    const users = useQuery({
        queryKey: ['users'],
        queryFn: () => fetchBizOrUsers('users'),
    })
    const business = useQuery({
        queryKey: ['business'],
        queryFn: () => fetchBizOrUsers('businesses'),
    })
    const createObjs = (data: (UserObj | BusinessObj | BusinessObjFrmDb)[]) => {
        const obj = new Map()
        for (const user of data)
            obj.set(user.id, user)
        return obj
    }


    return (
        <DataContext.Provider value={{
            users: createObjs((users.data ?? [])),
            businesses: createObjs((business.data ?? [])),
        }}>
            {children}
        </DataContext.Provider>
    )
}
