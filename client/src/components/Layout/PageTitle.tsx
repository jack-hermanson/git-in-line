import React from "react";

interface Props {
    text: string;
    children?: React.ReactNode;
    borderBottom?: boolean;
    mb3?: boolean;
    className?: string;
}

export const PageTitle: React.FC<Props> = ({
    text,
    children,
    borderBottom = true,
    mb3 = true,
    className,
}: Props) => {
    return (
        <div
            className={`page-title ${borderBottom && "border-bottom"} ${
                mb3 && "mb-3"
            } ${className && className}`}
        >
            <h3 className="title-text">{text}</h3>
            {children && <div className="actions-button mb-1">{children}</div>}
        </div>
    );
};
