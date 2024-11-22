import * as React from "react";
import {createContext} from "react";
import {useQuery} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";
import axios, {AxiosResponse} from "axios";
import {BASE_URL} from "../libs/api.ts";


export const AuthContext = createContext<{
    user?: {
        userName: string;
        id: string;
    };
    loggedIn?: boolean;
    setContextData: React.Dispatch<React.SetStateAction<AuthContextObj>>;
}>({
    loggedIn: false,
    user: undefined,
    setContextData: () => {
    }
})

export const AuthContextProvider = ({children}: { children: React.ReactNode }) => {
    const [contextData, setContextData] = React.useState<AuthContextObj>({
        loggedIn: false,
        user: undefined,
    })
    const navigate = useNavigate();

    useQuery({
        queryKey: ['authorization'],
        queryFn: ():Promise<AxiosResponse>=>new Promise((resolve, reject)=>{
            try {
                axios.get(`${BASE_URL}/auth/allowed`, {withCredentials: true})
                    .then(res => resolve(res.data))
                    .catch(err => {
                        navigate("/auth")
                        reject(err)
                    })
            } catch (_err){
                // console.log("Err: ", err)
            }
        }),
        retry: true,
        retryOnMount: true,
        refetchOnWindowFocus: true,
        notifyOnChangeProps: ['status'],
        // retryDelay: 1
        staleTime: 21600000 // 6 hours
    })

    return (
        <AuthContext.Provider value={{
            ...contextData,
            setContextData: setContextData
        }}>
            {children}
        </AuthContext.Provider>
    )
}

