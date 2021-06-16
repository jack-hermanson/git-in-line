import React, {useState} from "react";
import {Button, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {PullRequestRecord} from "../../../../shared/src/resource_models/pullRequest";

interface Props {
    pullRequest: PullRequestRecord;
    isOpen: boolean;
    toggle: () => any;
    save: (status: number) => any;
}

export const StatusModal: React.FC<Props> = ({pullRequest, isOpen, toggle, save}: Props) => {

    const [status, setStatus] = useState(pullRequest.status);

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>
                Pull Request Status
            </ModalHeader>
            <form onSubmit={(e) => {
                e.preventDefault();
                save(status);
            }}>
                <ModalBody>
                    <Label className="form-label">Status</Label>
                    <Input type="select" value={status} onChange={e => setStatus(parseInt(e.target.value))}>
                        <option value={1}>Pending</option>
                        <option value={2}>Changes Requested</option>
                        <option value={3}>Approved</option>
                    </Input>
                </ModalBody>
                <ModalFooter>
                    <Button size="sm" color="secondary" onClick={() => toggle()}>Cancel</Button>
                    <Button size="sm" color="success" type="submit">Save</Button>
                </ModalFooter>
            </form>
        </Modal>
    );
}
