import {Button, Title} from "@mantine/core";
import {useLocation, useNavigate} from "react-router-dom";


export default function SideNavigation() {
    const paths: { name: string, path: string }[] = [
        {name: "Dashboard", path: "/"},
        {name: "Places", path: "/places"},
    ]
    const {pathname} = useLocation();

    const navigate = useNavigate();

    const isActive = (path: string) => {
        const original = String(pathname)
        if (pathname === '/' && path === pathname)
            return true;
        return path.replace("/", "").length > 1 && original.includes(path);

    }
    return (
        <nav className={'w-[200px] h-full text-white p-2 grid gap-2 bg-secondary-900 auto-rows-max'}>
            <Title size={'24px'} className={''}>Magical Nairobi</Title>
            <div className={'w-full grid gap-2 auto-rows-max'}>
                {paths.map((path, i) =>
                    <Button
                        key={i}
                        color={isActive(path.path) ? 'green' : 'white'}
                        variant={'light'}
                        onClick={() => navigate(path.path)}
                    >
                        {path.name}
                    </Button>
                )}
            </div>
        </nav>
    )
}


