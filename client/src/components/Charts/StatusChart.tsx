import React from "react";
import { useStoreState } from "../../store";
import { LoadingSpinner } from "../Utils/LoadingSpinner";
import { Bar, Pie } from "react-chartjs-2";
import { PrStatus } from "../../../../shared/src/enums";

export const StatusChart: React.FC = () => {
    const pullRequests = useStoreState((state) => state.pullRequests);

    return (
        <React.Fragment>
            {pullRequests ? renderChart() : <LoadingSpinner />}
        </React.Fragment>
    );

    function renderChart() {
        if (pullRequests) {
            const data = {
                labels: ["Pending", "Changes Requested", "Approved"],
                datasets: [
                    {
                        data: [
                            pullRequests.filter(
                                (o) => o.status === PrStatus.PENDING
                            ).length,
                            pullRequests.filter(
                                (o) => o.status === PrStatus.CHANGES
                            ).length,
                            pullRequests.filter(
                                (o) => o.status === PrStatus.APPROVED
                            ).length,
                        ],
                        backgroundColor: [
                            "rgba(200, 195, 114, 0.2)",
                            "rgba(255, 99, 132, 0.2)",
                            "rgba(30, 77, 43, 0.2)",
                        ],
                        borderWidth: 0,
                    },
                ],
            };

            return <Pie data={data} type={"pie"} />;
        }
    }
};
