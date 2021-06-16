import React from "react";
import { Badge } from "reactstrap";

interface Props {
    status: number;
    className?: string;
    onClick?: () => any;
}

export const StatusLabel: React.FC<Props> = ({
    status,
    className,
    onClick,
}: Props) => {
    let color, text;
    switch (status) {
        case 1:
            color = "secondary";
            text = "Pending";
            break;
        case 2:
            color = "danger";
            text = "Changes Requested";
            break;
        case 3:
            color = "success";
            text = "Approved";
            break;
    }

    return (
        <Badge onClick={onClick} className={className} color={color}>
            {text}
        </Badge>
    );
};
