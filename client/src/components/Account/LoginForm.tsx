import React, {useState} from "react";
import {Button, FormGroup, Input, Label} from "reactstrap";
import {LoginRequest} from "../../utils/types";

interface Props {
    onSubmit: (loginRequest: LoginRequest) => any;
}

export const LoginForm: React.FC<Props> = ({onSubmit}: Props) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <form onSubmit={submit} onReset={reset}>
            {renderUsername()}
            {renderPassword()}
            {renderButtons()}
        </form>
    );

    function submit(event: React.FormEvent) {
        event.preventDefault();
        onSubmit({username, password});
    }

    function reset(event: React.FormEvent) {
        event.preventDefault();
        setUsername("");
        setPassword("");
        focusOnUsername();
    }

    function renderUsername() {
        const id = "username-input";
        return (
            <FormGroup>
                <Label className="form-label" for={id}>Username</Label>
                <Input
                    autoFocus
                    required
                    type="text"
                    id={id}
                    onChange={e => setUsername(e.target.value)}
                    value={username}
                />
            </FormGroup>
        );
    }

    function renderPassword() {
        const id = "password-input";
        return (
            <FormGroup>
                <Label className="form-label" for={id}>Password</Label>
                <Input
                    required
                    type="password"
                    id={id}
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                />
            </FormGroup>
        );
    }

    function renderButtons() {
        return (
            <div className="bottom-buttons">
                <Button type="submit" color="success">Log In</Button>
                <Button type="reset" color="secondary">Reset</Button>
            </div>
        )
    }

    function focusOnUsername() {
        document.getElementById("username-input")?.focus();
    }
}
