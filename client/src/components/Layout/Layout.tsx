import React from "react";
import {Navigation} from "./Navigation";
import {Header} from "./Header";
import {Container} from "reactstrap";
import {CONTAINER_FLUID} from "../../constants";
import {Footer} from "./Footer";

interface Props {
    children: React.ReactNode;
}

export const Layout: React.FC<Props> = ({children}: Props) => {
    return (
        <React.Fragment>
            <div className="body-container">
                <Header />
                <Navigation />
                <Container fluid={CONTAINER_FLUID}>
                    <Container fluid={CONTAINER_FLUID} className="main-container">
                        {children}
                    </Container>
                </Container>
            </div>
            <Footer />
        </React.Fragment>
    );
}
