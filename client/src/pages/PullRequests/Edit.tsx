import React, {useEffect} from "react";
import {useHistory} from "react-router-dom";
import {PageTitle} from "../../components/Layout/PageTitle";
import {Col, Row} from "reactstrap";
import {RouteComponentProps} from "react-router";
import {useStoreState} from "../../store";
import {LoadingSpinner} from "../../components/Utils/LoadingSpinner";

export const Edit: React.FC<RouteComponentProps<{ id: string }>> = ({match}) => {

    const history = useHistory();
    const currentUser = useStoreState(state => state.currentUser);
    const pullRequest = useStoreState(state => state.pullRequests)
        ?.find(pr => pr.id === parseInt(match.params.id));

    useEffect(() => {
        if (!currentUser) {
            history.push("/account/login");
        }
    }, [history, currentUser]);

    return (
        <React.Fragment>
            <Row>
                <Col>
                    <PageTitle text="Edit Pull Request"/>
                </Col>
            </Row>
            {pullRequest ? (
                <React.Fragment>
                    <Row>
                        <Col>
                            <p>Editing PR with URL {pullRequest.gitHubUrl}</p>
                        </Col>
                    </Row>
                </React.Fragment>
            ) : <LoadingSpinner />}

        </React.Fragment>
    );
}
