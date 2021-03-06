import React, { useState } from "react";
import { Card, CardBody, CardFooter, CardHeader } from "reactstrap";
import { PullRequestRecord } from "../../../../shared/src/resource_models/pullRequest";
import { KeyValTable } from "../Utils/KeyValTable";
import { PriorityLabel } from "./PriorityLabel";
import {
    capitalizeFirstLetter,
    formatDateTime,
    KeyValPair,
    scrollToTop,
} from "../../utils/utils";
import { StatusLabel } from "./StatusLabel";
import { useStoreActions, useStoreState } from "../../store";
import { StatusModal } from "./StatusModal";
import { Link } from "react-router-dom";

interface Props {
    pullRequest: PullRequestRecord;
}

export const PullRequest: React.FC<Props> = ({ pullRequest }: Props) => {
    const accounts = useStoreState((state) => state.accounts);
    const editPullRequest = useStoreActions(
        (actions) => actions.editPullRequest
    );
    const currentUser = useStoreState((state) => state.currentUser);
    const [showStatusModal, setShowStatusModal] = useState(false);

    const attributes: KeyValPair[] = [
        {
            key: "GitHub URL",
            val: (
                <a
                    href={pullRequest.gitHubUrl}
                    rel="noreferrer"
                    target="_blank"
                >
                    {pullRequest.gitHubUrl}
                </a>
            ),
        },
        {
            key: "Priority",
            val: <PriorityLabel priority={pullRequest.priority} />,
        },
    ];

    if (pullRequest.notes) {
        attributes.push({ key: "Notes", val: pullRequest.notes });
    }
    if (accounts) {
        const account = accounts.find((a) => a.id === pullRequest.accountId);
        attributes.push({
            key: "User",
            val: capitalizeFirstLetter(account!.username),
        });
    }
    if (pullRequest.updated !== pullRequest.created) {
        attributes.push({
            key: "Updated",
            val: formatDateTime(pullRequest.updated),
        });
    }
    if (pullRequest.jiraUrl) {
        attributes.push({
            key: "JIRA URL",
            val: (
                <a target="_blank" rel="noreferrer" href={pullRequest.jiraUrl}>
                    {pullRequest.jiraUrl}
                </a>
            ),
        });
    }

    return (
        <Card className="mb-3 no-mb-last">
            <CardHeader className="d-flex">
                {renderTitle()}
                {currentUser?.token && (
                    <Link
                        className="ms-auto"
                        to={`/pull-requests/edit/${pullRequest.id}`}
                    >
                        Edit
                    </Link>
                )}
            </CardHeader>
            <CardBody className="p-0">
                <KeyValTable
                    keyValPairs={attributes}
                    className="card-table mb-0 table-striped same-width"
                />
            </CardBody>
            <CardFooter className="d-block d-lg-none px-1">
                {renderStatusLabel()}
            </CardFooter>
            {renderModal()}
        </Card>
    );

    function renderTitle() {
        return (
            <h5 className="mb-0 d-flex align-items-center">
                <span>{formatDateTime(pullRequest.created)}</span>
                <div className="d-none d-lg-flex">{renderStatusLabel()}</div>
            </h5>
        );
    }

    function renderStatusLabel() {
        return (
            <StatusLabel
                className={`ms-2 ${currentUser?.token && "hover-mouse"}`}
                status={pullRequest.status}
                onClick={() => setShowStatusModal(true)}
            />
        );
    }

    function renderModal() {
        if (currentUser?.token) {
            return (
                <StatusModal
                    pullRequest={pullRequest}
                    isOpen={showStatusModal}
                    toggle={() => setShowStatusModal((o) => !o)}
                    save={async (status: number) => {
                        try {
                            await editPullRequest({
                                pullRequest: {
                                    ...pullRequest,
                                    status: status,
                                },
                                token: currentUser.token!,
                            });
                            setShowStatusModal(false);
                        } catch (error) {
                            scrollToTop();
                        }
                    }}
                />
            );
        }
    }
};
