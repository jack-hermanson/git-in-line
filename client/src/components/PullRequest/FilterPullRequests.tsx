import React, {useState} from "react";
import {MobileToggleCard} from "../Utils/MobileToggleCard";
import {FormGroup, Input, Label} from "reactstrap";
import {PullRequestRecord} from "../../models/pullRequest";
import {useStoreState} from "../../store";

interface Props {
    setFilteredPullRequests: (pullRequests: PullRequestRecord[]) => any;
}

export const FilterPullRequests: React.FC = () => {

    const [selectedPriorities, setSelectedPriorities] = useState<number[]>([]);
    const [selectedStatuses, setSelectedStatuses] = useState<number[]>([]);
    const [selectedAccountIds, setSelectedAccountIds] = useState<number[]>([]);

    const accounts = useStoreState(state => state.accounts);

    return (
        <MobileToggleCard cardTitle="Filter" className="mb-3 mb-lg-0 sticky-top">
            <form>
                {renderPriority()}
                {renderStatus()}
                {renderAccounts()}
            </form>
        </MobileToggleCard>
    );

    function renderPriority() {
        const priorityOptions = [
            {value: 3, label: "Low"},
            {value: 2, label: "Medium"},
            {value: 1, label: "High"}
        ];

        return (
            <FormGroup>
                <Label className="form-label">Priority</Label>
                {priorityOptions.map(priorityOption => {
                    const alreadySelected = selectedPriorities.includes(priorityOption.value);
                    const id = `priority-checkbox-${priorityOption.value}`;
                    return (
                        <FormGroup check>
                            <Input
                                onChange={event => {
                                    const checked = event.target.checked;
                                    if (checked && !alreadySelected) {
                                        setSelectedPriorities(s => [...s, priorityOption.value]);
                                    }
                                    if (!checked && alreadySelected) {
                                        setSelectedPriorities(s => s.filter(o => o !== priorityOption.value));
                                    }
                                }}
                                id={id}
                                type="checkbox"
                                checked={alreadySelected}
                            />
                            <Label for={id} className="form-check-label">{priorityOption.label}</Label>
                        </FormGroup>
                    );
                })}
            </FormGroup>
        );
    }

    function renderStatus() {
        const statusOptions = [
            {value: 1, label: "Pending"},
            {value: 2, label: "Changes Requested"},
            {value: 3, label: "Approved"}
        ];

        return (
            <FormGroup>
                <Label className="form-label">Status</Label>
                {statusOptions.map(statusOption => {
                    const alreadySelected = selectedStatuses.includes(statusOption.value);
                    const id = `status-checkbox-${statusOption.value}`;
                    return (
                        <FormGroup check>
                            <Input
                                onChange={event => {
                                    const checked = event.target.checked;
                                    if (checked && !alreadySelected) {
                                        setSelectedStatuses(s => [...s, statusOption.value]);
                                    }
                                    if (!checked && alreadySelected) {
                                        setSelectedStatuses(s => s.filter(o => o !== statusOption.value));
                                    }
                                }}
                                id={id}
                                type="checkbox"
                                checked={alreadySelected}
                            />
                            <Label for={id} className="form-check-label">{statusOption.label}</Label>
                        </FormGroup>
                    )
                })}
            </FormGroup>
        );
    }

    function renderAccounts() {
        if (accounts) {
            return (
                <FormGroup>
                    <Label className="form-label">Users</Label>
                    {accounts.map(account => {
                        const id = `account-${account.id}`;
                        const alreadySelected = selectedAccountIds.includes(account.id);
                        return (
                            <FormGroup check>
                                <Input
                                    type="checkbox"
                                    checked={alreadySelected}
                                    id={id}
                                    onChange={event => {
                                        const checked = event.target.checked;
                                        if (checked && !alreadySelected) {
                                            setSelectedAccountIds(s => [...s, account.id]);
                                        }
                                        if (!checked && alreadySelected) {
                                            setSelectedAccountIds(s => s.filter(o => o !== account.id))
                                        }
                                    }}
                                />
                                <Label for={id} className="form-check-label capitalize">{account.username}</Label>
                            </FormGroup>
                        );
                    })}
                </FormGroup>
            )
        }
    }
}