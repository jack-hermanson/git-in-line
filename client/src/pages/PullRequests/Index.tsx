import React, {useEffect, useState} from "react";
import {PageTitle} from "../../components/Layout/PageTitle";
import {Col, Row} from "reactstrap";
import {APP_NAME} from "../../utils/constants";
import {Link} from "react-router-dom";
import {LoadingSpinner} from "../../components/Utils/LoadingSpinner";
import {useStoreState} from "../../store";
import {PullRequest} from "../../components/PullRequest/PullRequest";
import {FilterPullRequests} from "../../components/PullRequest/FilterPullRequests";
import {PullRequestRecord} from "../../../../shared/src/resource_models/pullRequest";

export const Index: React.FC = () => {

    const pullRequests = useStoreState(state => state.pullRequests);
    const [filteredPullRequests, setFilteredPullRequests] = useState<PullRequestRecord[]>([]);

    useEffect(() => {
        document.title = `${APP_NAME} | Pull Requests`;
        setFilteredPullRequests(pullRequests || []);
    }, [setFilteredPullRequests, pullRequests]);

    return (
        <React.Fragment>
            <Row>
                <Col>
                    <PageTitle text="Pull Requests">
                        <Link to="/pull-requests/new" className="btn btn-success btn-sm">New PR</Link>
                    </PageTitle>
                </Col>
            </Row>
            <Row>
                <Col lg={3}>
                    <FilterPullRequests />
                </Col>
                <Col lg={9}>
                    {filteredPullRequests ? (
                        filteredPullRequests.map(pr => (
                            <PullRequest pullRequest={pr} key={pr.id} />
                        ))
                    ) : <LoadingSpinner /> }
                </Col>
            </Row>
        </React.Fragment>
    );
}
