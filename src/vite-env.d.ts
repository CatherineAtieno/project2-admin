/// <reference types="vite/client" />


declare interface AuthContextObj {
    user?: {
        userName: string;
        id: string;
    };
    loggedIn?: boolean;
}

declare interface ServiceObj {
    [key: string]: BusinessObj | string | number;

    id: string;
    name: string;
    price: number;
    business?: BusinessObj;
}

declare interface AddressObj {
    [key: string]: string

    county: string,
    town: string,
    street: string,
    maps: string
}

declare interface TransportObj {
    [key: string]: string | "Train" | "Matatu" | "Cab" | "Boda" | "Your location"

    type: "Train" | "Matatu" | "Cab" | "Boda" | string;
    stage: string | "Your location";
}

declare interface BusinessObj {
    [key: string]: string | 'hotel' | 'restaurant' | 'fun place' | AddressObj | File[] | ServiceObj[] | TransportObj[] | UserObj | undefined;

    id: string;
    name: string;
    phone: string;
    email: string;
    address: AddressObj;
    kind: 'hotel' | 'restaurant' | 'fun place' | string;
    images: File[];
    services: ServiceObj[];
    transport: TransportObj[];
    owner?: UserObj;
}

declare interface ImgObj {
    [key: string]: string

    id: string;
    img: string,
    place: string
}

declare type BusinessObjFrmDbReturn =
    string
    | 'hotel'
    | 'restaurant'
    | 'fun place'
    | AddressObj
    | TransportObj[]
    | ImgObj[]
    | ServiceObj[]
    | undefined
    | UserObj


declare interface UserObj {
    [key: string]: string | BusinessObjFrmDbReturn
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    business: BusinessObj
}

declare interface BusinessObjFrmDb {
    id: string;
    name: string;
    phone: string;
    email: string;
    address: AddressObj;
    transport?: TransportObj[]
    kind: 'hotel' | 'restaurant' | 'fun place' | string;
    images: ImgObj[];
    services: ServiceObj[];
    owner?: UserObj;

    [key: string]: string | 'hotel' | 'restaurant' | 'fun place' | AddressObj | TransportObj[] | ImgObj[] | ServiceObj[] | UserObj | undefined;
}
declare interface DataContextObj {
    users: Map<string, UserObj>,
    businesses: Map<string, BusinessObjFrmDb>,
}
