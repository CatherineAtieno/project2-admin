import './App.css'
import {Route, Routes} from "react-router-dom";
import AuthPage from "./pages/Auth.page.tsx";
import HomePage from "./pages/Home.page.tsx";

function App() {

    return (
        <>
            <Routes>
                <Route index={true} path={'/*'} element={<HomePage />} />
                <Route path={'/auth'} element={<AuthPage />} />
            </Routes>
        </>
    )
}

export default App
