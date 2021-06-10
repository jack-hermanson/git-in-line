import React from "react";
import {PageTitle} from "../../components/Layout/PageTitle";
import {Col, Row} from "reactstrap";
import {CreateEditPullRequest} from "../../components/PullRequest/CreateEditPullRequest";

export const New: React.FC = () => {
    return (
        <React.Fragment>
            <Row>
                <Col>
                    <PageTitle text="New Pull Request" />
                </Col>
            </Row>
            <Row>
                <Col lg={6}>
                    <CreateEditPullRequest />
                </Col>
            </Row>
        </React.Fragment>
    )
}
