import React from "react";
import { useStoreState } from "../../store";
import { AlertPanel } from "./AlertPanel";

export const Alerts: React.FC = () => {
    const alerts = useStoreState((state) => state.alerts);

    return (
        <div>
            {alerts.map((alert) => (
                <AlertPanel
                    key={`${Math.random()}-${alert.text}`}
                    alert={alert}
                />
            ))}
        </div>
    );
};
