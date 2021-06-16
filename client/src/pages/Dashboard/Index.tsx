import React, { useEffect } from "react";
import { Col, Row } from "reactstrap";
import { PageTitle } from "../../components/Layout/PageTitle";
import { APP_NAME } from "../../utils/constants";
import { StatusChart } from "../../components/Charts/StatusChart";
import { DatesChart } from "../../components/Charts/DatesChart";
import { useStoreState } from "../../store";
import { PullRequest } from "../../components/PullRequest/PullRequest";
import { LoadingSpinner } from "../../components/Utils/LoadingSpinner";

export const Index: React.FC = () => {
    useEffect(() => {
        document.title = `${APP_NAME} | Dashboard`;
    });

    const pullRequests = useStoreState((state) => state.pullRequests);

    return (
        <React.Fragment>
            <Row>
                <Col>
                    <PageTitle text="Dashboard" />
                </Col>
            </Row>
            <Row>
                <Col lg={4} className="mb-3 mb-lg-0">
                    <StatusChart />
                </Col>
                <Col lg={4} className="mb-3 mb-lg-0">
                    <DatesChart />
                </Col>
                <Col lg={4}>
                    <h4>Most Recent</h4>
                    {pullRequests?.length ? (
                        <React.Fragment>
                            <PullRequest pullRequest={pullRequests[0]} />
                            <PullRequest pullRequest={pullRequests[1]} />
                        </React.Fragment>
                    ) : (
                        <LoadingSpinner />
                    )}
                </Col>
            </Row>
        </React.Fragment>
    );
};
