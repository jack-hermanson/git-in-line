import React from "react";
import {Card, CardBody, CardHeader} from "reactstrap";
import {PullRequestRecord} from "../../models/pullRequest";
import {KeyValTable} from "../Utils/KeyValTable";
import {PriorityLabel} from "./PriorityLabel";
import {formatDateTime, KeyValPair} from "../../utils";
import {StatusLabel} from "./StatusLabel";

interface Props {
    pullRequest: PullRequestRecord;
}

export const PullRequest: React.FC<Props> = ({pullRequest}: Props) => {

    const attributes: KeyValPair[] = [
        {key: "GitHub URL", val: <a href={pullRequest.gitHubUrl} rel="nofollow" target="_blank">{pullRequest.gitHubUrl}</a>},
        {key: "Priority", val: <PriorityLabel priority={pullRequest.priority} />}
    ];

    if (pullRequest.notes) {
        attributes.push({key: "Notes", val: pullRequest.notes});
    }
    if (pullRequest.updated !== pullRequest.created) {
        attributes.push({key: "Updated", val: formatDateTime(pullRequest.updated)});
    }

    return (
        <Card className="mb-3 no-mb-last">
            <CardHeader>
                {renderTitle()}
            </CardHeader>
            <CardBody className="p-0">
                <KeyValTable keyValPairs={attributes} className="card-table mb-0 table-striped same-width" />
            </CardBody>
        </Card>
    );

    function renderTitle() {
        return (
            <h5 className="mb-0 d-flex align-items-center">
                <span>
                    {formatDateTime(pullRequest.created)}
                </span>
                <StatusLabel
                    className="ms-2"
                    status={pullRequest.status}
                />
            </h5>
        )
    }
}
