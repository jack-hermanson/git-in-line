import React, {useState} from "react";
import {MobileToggleCard} from "../Utils/MobileToggleCard";
import {Button, FormGroup, Input, Label} from "reactstrap";
import {PullRequestRecord} from "../../models/pullRequest";
import {useStoreState} from "../../store";
import {FilterCheckboxes} from "../Utils/FilterCheckboxes";

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
                {renderButton()}
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
            <FilterCheckboxes
                label="Priority"
                options={priorityOptions}
                selectedItems={selectedPriorities}
                setSelectedItems={setSelectedPriorities}
            />
        );
    }

    function renderStatus() {
        const statusOptions = [
            {value: 1, label: "Pending"},
            {value: 2, label: "Changes Requested"},
            {value: 3, label: "Approved"}
        ];

        return (
            <FilterCheckboxes
                label="Status"
                options={statusOptions}
                selectedItems={selectedStatuses}
                setSelectedItems={setSelectedStatuses}
            />
        );
    }

    function renderAccounts() {
        if (accounts) {

            const accountOptions = accounts.map(account => {
                return {value: account.id, label: account.username}
            });

            return (
                <FilterCheckboxes
                    label="Account"
                    options={accountOptions}
                    selectedItems={selectedAccountIds}
                    setSelectedItems={setSelectedAccountIds}
                    capitalizeLabels={true}
                />
            );
        }
    }

    function renderButton() {
        return (
            <div className="d-grid col-12">
                <Button size="sm" color="secondary">Reset</Button>
            </div>
        );
    }
}