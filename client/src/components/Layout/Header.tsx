import React from "react";
import csuSignature from "../../images/csu-signature.svg";
import csuSignatureMobile from "../../images/csu-signature-mobile.svg";
import {Container} from "reactstrap";
import {APP_NAME, CONTAINER_FLUID} from "../../constants";
import {Link} from "react-router-dom";

export const Header: React.FC = () => {
    return (
        <div className="header">
            <Container fluid={CONTAINER_FLUID}>
                <div className="logo-container">
                    <img className="csu-logo d-none d-lg-block" alt="logo" src={csuSignature} />
                    <img className="csu-logo d-block d-lg-none" alt="logo" src={csuSignatureMobile} />
                    <div className="app-name">
                        <Link to="/">
                            {APP_NAME}
                        </Link>
                    </div>
                </div>
            </Container>
        </div>
    );
}
