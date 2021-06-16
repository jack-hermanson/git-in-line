import React, {useEffect} from "react";
import {Card, Col, Row} from "reactstrap";
import {PageTitle} from "../../components/Layout/PageTitle";
import {APP_NAME} from "../../utils/constants";

export const Index: React.FC = () => {

    useEffect(() => {
        document.title = `${APP_NAME} | Dashboard`;
    });

    return (
        <React.Fragment>
            <Row>
                <Col>
                    <PageTitle text="Dashboard" />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card>
                        <p>test</p>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <p>test</p>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    )
}
