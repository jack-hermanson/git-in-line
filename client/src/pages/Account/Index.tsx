import React, {useEffect} from "react";
import {Col, Row} from "reactstrap";
import {PageTitle} from "../../components/Layout/PageTitle";
import {APP_NAME} from "../../constants";

export const Index: React.FC = () => {
    useEffect(() => {
        document.title = `${APP_NAME} | Account`;
    });

    return (
        <React.Fragment>
            <Row>
                <Col>
                    <PageTitle text="Account" />
                </Col>
            </Row>
        </React.Fragment>
    );
}
