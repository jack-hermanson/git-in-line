import React from "react";
import { useStoreState } from "../../store";
import { LoadingSpinner } from "../Utils/LoadingSpinner";
import { Bar } from "react-chartjs-2";

export const DatesChart: React.FC = () => {
    const pullRequests = useStoreState((state) => state.pullRequests);

    return (
        <React.Fragment>
            {pullRequests ? renderChart() : <LoadingSpinner />}
        </React.Fragment>
    );

    function renderChart() {
        const dates = getDates();
        if (pullRequests && dates.length >= 3) {
            const data = {
                labels: [dates[2], dates[1], dates[0]],
                datasets: [
                    {
                        label: "Pull Requests",
                        data: [
                            pullRequests.filter(
                                (o) =>
                                    new Date(o.created).toLocaleDateString() ===
                                    dates[2]
                            ).length,
                            pullRequests.filter(
                                (o) =>
                                    new Date(o.created).toLocaleDateString() ===
                                    dates[1]
                            ).length,
                            pullRequests.filter(
                                (o) =>
                                    new Date(o.created).toLocaleDateString() ===
                                    dates[0]
                            ).length,
                        ],
                        backgroundColor: ["rgba(30, 77, 43, 0.2)"],
                        borderWidth: 0,
                    },
                ],
            };

            return (
                <Bar
                    data={data}
                    options={{ maintainAspectRatio: false }}
                    type={"bar"}
                />
            );
        }
    }

    function getDates(): string[] {
        if (pullRequests) {
            const dates = new Set<string>();
            pullRequests
                .sort((pr1, pr2) => {
                    return pr1.created > pr2.created ? 1 : -1;
                })
                .forEach((pr) =>
                    dates.add(new Date(pr.created).toLocaleDateString())
                );
            return Array.from(dates);
        }
        return [];
    }
};
