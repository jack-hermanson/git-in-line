import React from "react";
import csuSignature from "../../images/csu-signature.svg";
import csuSignatureMobile from "../../images/csu-signature-mobile.svg";
import {Container} from "reactstrap";
import {CONTAINER_FLUID} from "../../utils/constants";

export const Header: React.FC = () => {
    return (
        <div className="header">
            <Container fluid={CONTAINER_FLUID}>
                <div className="logo-container">
                    <img className="csu-logo d-none d-lg-block" alt="logo" src={csuSignature} />
                    <img className="csu-logo d-block d-lg-none" alt="logo" src={csuSignatureMobile} />
                    <div className="app-name">
                        <a rel="noreferrer" target="_blank" href="https://www.chhs.colostate.edu/">
                            College&nbsp;of&nbsp;Health and&nbsp;Human&nbsp;Sciences
                        </a>
                    </div>
                </div>
            </Container>
        </div>
    );
}
