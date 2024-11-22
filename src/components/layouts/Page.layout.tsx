import React from "react";
import {Title} from "@mantine/core";


interface props extends React.HtmlHTMLAttributes<HTMLDivElement> {
    pageName: string;
    children?: React.ReactNode
}


export default function PageLayout({pageName,children, ...rest}: props) {

    return (
        <div className={`w-full h-screen text-secondary-900 flex-1 text-left p-2 grid auto-rows-max`}>
            <div className={'w-full border-b h-[50px] !leading-[50px] pl-2'}>
                <Title>{pageName}</Title>
            </div>
            <div {...rest} className={` ${rest.className}`}>
                {children}
            </div>
        </div>
    )
}

