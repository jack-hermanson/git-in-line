import React from "react";
import {Navigation} from "./Navigation";
import {Header} from "./Header";

interface Props {
    children: React.ReactNode;
}

export const Layout: React.FC<Props> = ({children}: Props) => {
    return (
        <div className="body-container">
            <Header />
            <Navigation />
            {children}
        </div>
    );
}
