import React, { useState } from "react";
import { MobileToggleCard } from "../Utils/MobileToggleCard";
import { Button } from "reactstrap";
import { PullRequestRecord } from "../../../../shared/src/resource_models/pullRequest";
import { useStoreState } from "../../store";
import { FilterCheckboxes } from "../Utils/FilterCheckboxes";
import { PriorityLabels, PrStatusLabels } from "../../../../shared/src/enums";
import { enumToValueLabelPairs, ValueLabelPair } from "../../utils/utils";

interface Props {
    setFilteredPullRequests: (pullRequests: PullRequestRecord[]) => any;
}

export const FilterPullRequests: React.FC = () => {
    const [selectedPriorities, setSelectedPriorities] = useState<number[]>([]);
    const [selectedStatuses, setSelectedStatuses] = useState<number[]>([]);
    const [selectedAccountIds, setSelectedAccountIds] = useState<number[]>([]);

    const accounts = useStoreState((state) => state.accounts);

    return (
        <MobileToggleCard
            cardTitle="Filter"
            className="mb-3 mb-lg-0 sticky-top"
        >
            <form>
                {renderPriority()}
                {renderStatus()}
                {renderAccounts()}
                {renderButton()}
            </form>
        </MobileToggleCard>
    );

    function renderPriority() {
        const priorityOptions = enumToValueLabelPairs(PriorityLabels);

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
        const statusOptions = enumToValueLabelPairs(PrStatusLabels);

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
            const accountOptions: ValueLabelPair<number>[] = accounts.map(
                (account) => {
                    return { value: account.id, label: account.username };
                }
            );

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
                <Button size="sm" color="secondary">
                    Reset
                </Button>
            </div>
        );
    }
};
