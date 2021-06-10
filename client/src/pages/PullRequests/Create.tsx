import React, {useEffect} from "react";
import {PageTitle} from "../../components/Layout/PageTitle";
import {Col, Row} from "reactstrap";
import {CreateEditPullRequest} from "../../components/PullRequest/CreateEditPullRequest";
import {PullRequestRequest} from "../../models/pullRequest";
import {useStoreActions, useStoreState} from "../../store";
import {useHistory} from "react-router-dom";

export const Create: React.FC = () => {

    const savePullRequest = useStoreActions(actions => actions.savePullRequest);
    const currentUser = useStoreState(state => state.currentUser);
    const history = useHistory();

    useEffect(() => {
        if (!currentUser) {
            history.push("/account/login");
        }
    }, [history, currentUser]);

    return (
        <React.Fragment>
            <Row>
                <Col>
                    <PageTitle text="Create Pull Request" />
                </Col>
            </Row>
            <Row>
                <Col lg={6}>
                    <CreateEditPullRequest onSubmit={submit} />
                </Col>
            </Row>
        </React.Fragment>
    );

    async function submit(newPr: PullRequestRequest) {
        if (currentUser?.token) {
            try {
                await savePullRequest({pullRequest: newPr, token: currentUser.token});
                console.log("ok");
            } catch (error) {
                console.error(error);
            }
        }
    }
}
