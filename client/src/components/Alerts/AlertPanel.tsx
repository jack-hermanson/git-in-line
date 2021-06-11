import React from "react";
import {AlertItem} from "../../models/alert";
import {Alert} from "reactstrap";
import {FontAwesomeIcon as FA} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {useStoreActions, useStoreState} from "../../store";

interface Props {
    alert: AlertItem;
}

export const AlertPanel: React.FC<Props> = ({alert}) => {

    const setAlerts = useStoreActions(actions => actions.setAlerts);
    const alerts = useStoreState(state => state.alerts);

    return (
        <Alert color={alert.color} fade={false} className="d-flex" onClick={() => removeAlert()}>
            <p className="mb-0">{alert.text}</p>
            <span className="ms-auto hover-mouse">
                <FA icon={faTimes} />
            </span>
        </Alert>
    );

    function removeAlert() {
        setAlerts(alerts.filter(a => a !== alert));
    }
}
