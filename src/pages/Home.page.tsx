import SideNavigation from "../components/SideNavigation.tsx";
import {Route, Routes} from "react-router-dom";
import DashboardPage from "./Dashboard.page.tsx";
import PlacesPage from "./Places.page.tsx";


export default function HomePage() {
    return (
        <div className={'w-full h-screen flex bg-slate-100'}>
            <SideNavigation/>
            <div className={'w-[calc(100%-200px)] h-screen overflow-hidden overflow-y-auto grid'}>
                <Routes>
                    <Route index={true} path={'/'} element={<DashboardPage/>}/>
                    <Route path={"/places/*"} element={<PlacesPage/>}/>
                </Routes>
            </div>
        </div>
    )
}

