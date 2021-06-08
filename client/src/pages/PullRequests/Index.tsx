import React, {useEffect} from "react";
import {PageTitle} from "../../components/Layout/PageTitle";
import {Button, Col, Row} from "reactstrap";
import {APP_NAME} from "../../constants";

export const Index: React.FC = () => {
    useEffect(() => {
        document.title = `${APP_NAME} | Pull Requests`;
    });

    return (
        <React.Fragment>
            <Row>
                <Col>
                    <PageTitle text="Pull Requests">
                        <Button color="success" size="sm">New PR</Button>
                    </PageTitle>
                </Col>
            </Row>
        </React.Fragment>
    );
}
