import React, {useState} from "react";
import {Card, CardBody, CardHeader} from "reactstrap";
import {PullRequestRecord} from "../../models/pullRequest";
import {KeyValTable} from "../Utils/KeyValTable";
import {PriorityLabel} from "./PriorityLabel";
import {formatDateTime, KeyValPair, scrollToTop} from "../../utils";
import {StatusLabel} from "./StatusLabel";
import {useStoreActions, useStoreState} from "../../store";
import {StatusModal} from "./StatusModal";

interface Props {
    pullRequest: PullRequestRecord;
}

export const PullRequest: React.FC<Props> = ({pullRequest}: Props) => {

    const accounts = useStoreState(state => state.accounts);
    const editPullRequest = useStoreActions(actions => actions.editPullRequest);
    const currentUser = useStoreState(state => state.currentUser);
    const [showStatusModal, setShowStatusModal] = useState(false);

    const attributes: KeyValPair[] = [
        {key: "GitHub URL", val: <a href={pullRequest.gitHubUrl} rel="noreferrer" target="_blank">{pullRequest.gitHubUrl}</a>},
        {key: "Priority", val: <PriorityLabel priority={pullRequest.priority} />}
    ];

    if (pullRequest.notes) {
        attributes.push({key: "Notes", val: pullRequest.notes});
    }
    if (accounts) {
        const account = accounts.find(a => a.id === pullRequest.accountId);
        attributes.push({key: "User", val: account!.username})
    }
    if (pullRequest.updated !== pullRequest.created) {
        attributes.push({key: "Updated", val: formatDateTime(pullRequest.updated)});
    }
    if (pullRequest.jiraUrl) {
        attributes.push({key: "JIRA URL", val: <a target="_blank" rel="noreferrer" href={pullRequest.jiraUrl}>{pullRequest.jiraUrl}</a>})
    }


    return (
        <Card className="mb-3 no-mb-last">
            <CardHeader>
                {renderTitle()}
            </CardHeader>
            <CardBody className="p-0">
                <KeyValTable keyValPairs={attributes} className="card-table mb-0 table-striped same-width" />
            </CardBody>
            {renderModal()}
        </Card>
    );

    function renderTitle() {
        return (
            <h5 className="mb-0 d-flex align-items-center">
                <span>
                    {formatDateTime(pullRequest.created)}
                </span>
                <StatusLabel
                    className={`ms-2 ${currentUser?.token && "hover-mouse"}`}
                    status={pullRequest.status}
                    onClick={() => setShowStatusModal(true)}
                />
            </h5>
        );
    }

    function renderModal() {
        if (currentUser?.token) {
            return (
                <StatusModal
                    pullRequest={pullRequest}
                    isOpen={showStatusModal}
                    toggle={() => setShowStatusModal(o => !o)}
                    save={async (status: number) => {
                        try {
                            await editPullRequest({
                                pullRequest: {
                                    ...pullRequest,
                                    status: status
                                },
                                token: currentUser.token!
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
}
