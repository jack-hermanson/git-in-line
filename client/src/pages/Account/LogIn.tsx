import React, {useEffect} from "react";
import {PageTitle} from "../../components/Layout/PageTitle";
import {Col, Row} from "reactstrap";
import {APP_NAME} from "../../constants";

export const LogIn: React.FC = () => {

    useEffect(() => {
        document.title = `${APP_NAME} | Log In`;
    })

    return (
        <React.Fragment>
            <Row>
                <Col>
                    <PageTitle text="Log In" />
                </Col>
            </Row>
            <Row>
                <Col>
                    <p>test</p>
                </Col>
            </Row>
        </React.Fragment>
    );
}
