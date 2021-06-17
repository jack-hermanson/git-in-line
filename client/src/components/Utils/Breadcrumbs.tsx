import React from "react";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from "react-router-dom";

interface Props {
    links: { path: string; label: string }[];
}

export const Breadcrumbs: React.FC<Props> = ({ links }: Props) => {
    return (
        <Breadcrumb>
            {links.map((link, index) => (
                <BreadcrumbItem
                    key={`${link.label}-${index}`}
                    active={index === links.length - 1}
                >
                    <Link to={link.path}>{link.label}</Link>
                </BreadcrumbItem>
            ))}
        </Breadcrumb>
    );
};
