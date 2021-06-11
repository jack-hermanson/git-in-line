import React from "react";
import {Badge} from "reactstrap";

interface Props {
    priority: number;
}

export const PriorityLabel: React.FC<Props> = ({priority}: Props) => {
    let color;
    let text;

    switch (priority) {
        case 1:
            color = "danger";
            text = "High";
            break;
        case 2:
            color = "success";
            text = "Medium";
            break;
        case 3:
            color = "secondary";
            text = "Low";
            break;
    }

    return (
        <Badge color={color}>{text}</Badge>
    );
}
