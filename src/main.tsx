import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'

// core styles are required for all packages
import '@mantine/core/styles.css';
import {createTheme, MantineProvider} from "@mantine/core";
import {BrowserRouter} from "react-router-dom";

// other css files are required only if
// you are using components from the corresponding package
// import '@mantine/dates/styles.css';
import '@mantine/dropzone/styles.css';
// import '@mantine/code-highlight/styles.css';
import '@mantine/notifications/styles.css'
import './index.css'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {DataContextProvider} from "./context/Data.Context.tsx";
import {AuthContextProvider} from "./context/Auth.Context.tsx";
import {Notifications} from "@mantine/notifications";


const theme = createTheme({
    primaryColor: 'primary',
    primaryShade: 5,
    components: {
        TextInput: {
            defaultProps: {variant: "filled"}
        }
    },
    colors: {
        'secondary': [
            "#fff1e7",
            "#fae3d5",
            "#f0c7ab",
            "#e6a87d",
            "#df8e57",
            "#da7e3e",
            "#d87430",
            "#c06323",
            "#ab571c",
            "#964a13"
        ],
        'primary': [
            "#e6f6ff",
            "#d3e7fc",
            "#a9ccf2",
            "#7bb0e9",
            "#5598e1",
            "#3c89dd",
            "#2d81db",
            "#1d6fc3",
            "#0f62b0",
            "#00559c"
        ],
        'tertiary': [
            "#ffe8f0",
            "#ffd1db",
            "#f9a2b4",
            "#f46f8b",
            "#f04568",
            "#ed2a52",
            "#ed1947",
            "#d40838",
            "#bd0030",
            "#a60028"
        ]
    }
})

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <MantineProvider theme={theme}>
            <Notifications position={"top-center"} />
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <AuthContextProvider>
                        <DataContextProvider>
                            <App/>
                        </DataContextProvider>
                    </AuthContextProvider>
                </BrowserRouter>
            </QueryClientProvider>
        </MantineProvider>
    </StrictMode>,
)
