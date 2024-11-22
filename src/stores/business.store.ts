import {createStore} from "zustand";


interface RestaurantObj extends BusinessObjFrmDb {
    kind: "restaurant" | string
}

interface funPlaceObj extends BusinessObjFrmDb {
    kind: "fun place" | string
}

interface HotelObj extends BusinessObjFrmDb {
    kind: "hotel" | string
}

type saveToStoreObj = (places: { [key: string]: BusinessObj[] }) => void;

interface BusinessStoreObj {
    [key: string]: Map<string, BusinessObjFrmDb> | saveToStoreObj;
    restaurants: Map<string, RestaurantObj>;
    funPlaces: Map<string, funPlaceObj>;
    hotel: Map<string, HotelObj>;

    saveToStore: (places: { [key: string]: BusinessObj[] }) => void;
}

const useBusinessStore = createStore<BusinessStoreObj>()((set) => ({
    funPlaces: new Map(),
    hotel: new Map(),
    restaurants: new Map(),
    saveToStore: (places) => {
        console.log("Adding...")
        for (const key of Object.keys(places)) {
            for(const place of places[key]){
                console.log("XX: ", place.id)
                set(prev => ({...prev, [key]: new Map(typeof prev[key] !== 'function' ? prev[key] : new Map()).set(place.id, place)}))
            }
        }
    }
}))

export default useBusinessStore;

