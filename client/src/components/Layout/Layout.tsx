import React from "react";
import {Navigation} from "./Navigation";
import {Header} from "./Header";
import {Container} from "reactstrap";
import {CONTAINER_FLUID} from "../../constants";

interface Props {
    children: React.ReactNode;
}

export const Layout: React.FC<Props> = ({children}: Props) => {
    return (
        <div className="body-container">
            <Header />
            <Navigation />
            <Container fluid={CONTAINER_FLUID}>
                <Container fluid={CONTAINER_FLUID} className="main-container">
                    {children}
                </Container>
            </Container>
        </div>
    );
}
