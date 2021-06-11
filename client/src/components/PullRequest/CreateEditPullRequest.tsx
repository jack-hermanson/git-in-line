import React, {useEffect, useState} from "react";
import {Button, FormGroup, Input, Label} from "reactstrap";
import {useStoreState} from "../../store";
import {useHistory} from "react-router-dom";
import {PullRequestRequest} from "../../models/pullRequest";

interface Props {
    onSubmit: (newPr: PullRequestRequest) => any;
}

export const CreateEditPullRequest: React.FC<Props> = ({onSubmit}) => {

    const [gitHubUrl, setGitHubUrl] = useState("");
    const [priority, setPriority] = useState(2);
    const [jiraUrl, setJiraUrl] = useState("");
    const [notes, setNotes] = useState("");

    const currentUser = useStoreState(state => state.currentUser);
    const history = useHistory();

    useEffect(() => {
        if (!currentUser) {
            history.push("/account/login");
        }
    }, [currentUser, history]);

    return (
        <form onSubmit={submit} onReset={reset}>
            {renderGitHubUrl()}
            {renderPriority()}
            {renderJiraUrl()}
            {renderNotes()}
            {renderButtons()}
        </form>
    );

    function submit(event: React.FormEvent) {
        event.preventDefault();
        onSubmit({
            gitHubUrl,
            priority,
            jiraUrl: jiraUrl.length ? jiraUrl : undefined,
            notes: notes.length ? notes : undefined
        });
    }

    function reset(event: React.FormEvent) {
        event.preventDefault();
        setGitHubUrl("");
        setPriority(2);
        setJiraUrl("");
        setNotes("");
        document.getElementById("github-url")?.focus();
    }

    function renderGitHubUrl() {
        const id = "github-url";
        return (
            <FormGroup>
                <Label for={id} className="form-label required">GitHub URL</Label>
                <Input
                    id={id}
                    type="url"
                    autoFocus
                    required
                    onChange={e => setGitHubUrl(e.target.value)}
                    value={gitHubUrl}
                />
            </FormGroup>
        );
    }

    function renderPriority() {
        const id = "priority";
        return (
            <FormGroup>
                <Label for={id} className="form-label required">Priority</Label>
                <Input type="select" value={priority} onChange={e => setPriority(parseInt(e.target.value))}>
                    <option value={3}>Low</option>
                    <option value={2}>Medium</option>
                    <option value={1}>High</option>
                </Input>
            </FormGroup>
        );
    }

    function renderJiraUrl() {
        const id = "jira-url";
        return (
            <FormGroup>
                <Label for={id} className="form-label">Jira URL</Label>
                <Input
                    type="url"
                    value={jiraUrl}
                    onChange={e => setJiraUrl(e.target.value)}
                    id={id}
                    placeholder="Optional..."
                />
            </FormGroup>
        );
    }

    function renderNotes() {
        const id = "notes";
        return (
            <FormGroup>
                <Label for={id} className="form-label">Notes</Label>
                <Input
                    type="textarea"
                    value={notes}
                    id={id}
                    placeholder="Optional..."
                    onChange={e => setNotes(e.target.value)}
                />
            </FormGroup>
        );
    }

    function renderButtons() {
        return (
            <div className="bottom-buttons">
                <Button type="submit" color="success">Create PR</Button>
                <Button type="reset" color="secondary">Reset</Button>
            </div>
        );
    }
}
