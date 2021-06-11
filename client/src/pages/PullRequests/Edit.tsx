import React from "react";
import {useHistory} from "react-router-dom";
import {PageTitle} from "../../components/Layout/PageTitle";
import {Col, Row} from "reactstrap";
import {RouteComponentProps} from "react-router";

export const Edit: React.FC<RouteComponentProps<{id: string}>> = ({match}) => {

    const history = useHistory();

    return (
        <React.Fragment>
            <Row>
                <Col>
                    <PageTitle text="Edit Pull Request" />
                </Col>
            </Row>
            <Row>
                <Col>
                    <p>Editing PR with ID {match.params.id}</p>
                </Col>
            </Row>
        </React.Fragment>
    );
}
