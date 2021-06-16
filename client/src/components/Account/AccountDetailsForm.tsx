import React, { useState } from "react";
import {
    AccountRecord,
    EditAccountRequest,
} from "../../../../shared/src/resource_models/account";
import { Button, FormGroup, Input, Label } from "reactstrap";

interface Props {
    account: AccountRecord;
    onSubmit: (editedAccount: EditAccountRequest) => any;
}

export const AccountDetailsForm: React.FC<Props> = ({
    account,
    onSubmit,
}: Props) => {
    const [username, setUsername] = useState(account.username);

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit({
                    username,
                });
            }}
            onReset={(e) => {
                e.preventDefault();
                setUsername(account.username);
                document.getElementById("username-input")?.focus();
            }}
        >
            {renderUsername()}
            {renderButtons()}
        </form>
    );

    function renderUsername() {
        const id = "username-input";
        return (
            <FormGroup>
                <Label for={id} className="form-label">
                    Username
                </Label>
                <Input
                    id={id}
                    type="text"
                    value={username}
                    required
                    autoFocus
                    onChange={(e) => setUsername(e.target.value)}
                />
            </FormGroup>
        );
    }

    function renderButtons() {
        return (
            <FormGroup className="bottom-buttons">
                <Button type="submit" color="success">
                    Save
                </Button>
                <Button type="reset" color="secondary">
                    Reset
                </Button>
            </FormGroup>
        );
    }
};
