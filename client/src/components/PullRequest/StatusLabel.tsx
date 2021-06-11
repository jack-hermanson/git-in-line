import React from "react";
import {Badge} from "reactstrap";

interface Props {
    status: number;
    className?: string;
}

export const StatusLabel: React.FC<Props> = ({status, className}: Props) => {

    let color, text;
    switch (status) {
        case 1:
            color = "secondary";
            text = "Pending";
            break;
        case 2:
            color = "success";
            text = "Approved";
            break;
        case 3:
            color = "danger";
            text = "Changes Requested"
            break;
    }

    return (
        <Badge className={className} color={color}>{text}</Badge>
    );
}
