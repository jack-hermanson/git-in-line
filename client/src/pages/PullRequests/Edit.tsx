import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { PageTitle } from "../../components/Layout/PageTitle";
import { Col, Row } from "reactstrap";
import { RouteComponentProps } from "react-router";
import { useStoreActions, useStoreState } from "../../store";
import { LoadingSpinner } from "../../components/Utils/LoadingSpinner";
import { CreateEditPullRequest } from "../../components/PullRequest/CreateEditPullRequest";
import { NewPrRequest } from "../../../../shared/src/resource_models/pullRequest";
import { scrollToTop } from "../../utils/utils";

export const Edit: React.FC<RouteComponentProps<{ id: string }>> = ({
    match,
}) => {
    const history = useHistory();
    const currentUser = useStoreState((state) => state.currentUser);
    const pullRequest = useStoreState((state) => state.pullRequests)?.find(
        (pr) => pr.id === parseInt(match.params.id)
    );
    const editPullRequest = useStoreActions(
        (actions) => actions.editPullRequest
    );

    useEffect(() => {
        if (!currentUser) {
            history.push("/account/login");
        }
        scrollToTop();
    }, [history, currentUser]);

    return (
        <React.Fragment>
            <Row>
                <Col>
                    <PageTitle text="Edit Pull Request" />
                </Col>
            </Row>
            {pullRequest ? (
                <CreateEditPullRequest
                    onSubmit={submit}
                    existingPr={pullRequest}
                />
            ) : (
                <LoadingSpinner />
            )}
        </React.Fragment>
    );

    async function submit(newPr: NewPrRequest) {
        if (currentUser?.token && pullRequest) {
            try {
                await editPullRequest({
                    pullRequest: {
                        ...newPr,
                        status: pullRequest.status,
                        id: pullRequest.id,
                    },
                    token: currentUser.token,
                });
                history.push("/pull-requests");
            } catch (error) {
                scrollToTop();
            }
        }
    }
};
