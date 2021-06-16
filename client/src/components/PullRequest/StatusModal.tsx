import React, { useState } from "react";
import {
    Button,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from "reactstrap";
import { PullRequestRecord } from "../../../../shared/src/resource_models/pullRequest";
import { PrStatusLabels } from "../../../../shared/src/enums";
import { InputSelectEnum } from "../Utils/InputSelectEnum";

interface Props {
    pullRequest: PullRequestRecord;
    isOpen: boolean;
    toggle: () => any;
    save: (status: number) => any;
}

export const StatusModal: React.FC<Props> = ({
    pullRequest,
    isOpen,
    toggle,
    save,
}: Props) => {
    const [status, setStatus] = useState(pullRequest.status);
    const id = "status-modal";

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>Pull Request Status</ModalHeader>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    save(status);
                }}
            >
                <ModalBody>
                    <Label for={id} className="form-label">
                        Status
                    </Label>
                    <InputSelectEnum
                        onChange={(e) => setStatus(parseInt(e.target.value))}
                        value={status}
                        id={id}
                        enumMap={PrStatusLabels}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button
                        size="sm"
                        color="secondary"
                        onClick={() => toggle()}
                    >
                        Cancel
                    </Button>
                    <Button size="sm" color="success" type="submit">
                        Save
                    </Button>
                </ModalFooter>
            </form>
        </Modal>
    );
};
