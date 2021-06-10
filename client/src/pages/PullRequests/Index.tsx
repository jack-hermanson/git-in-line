import React, {useEffect} from "react";
import {PageTitle} from "../../components/Layout/PageTitle";
import {Col, Row} from "reactstrap";
import {APP_NAME} from "../../constants";
import {Link} from "react-router-dom";

export const Index: React.FC = () => {
    useEffect(() => {
        document.title = `${APP_NAME} | Pull Requests`;
    });

    return (
        <React.Fragment>
            <Row>
                <Col>
                    <PageTitle text="Pull Requests">
                        <Link to="/pull-requests/new" className="btn btn-success btn-sm">New PR</Link>
                    </PageTitle>
                </Col>
            </Row>
        </React.Fragment>
    );
}
