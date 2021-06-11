import React from "react";
import Loader from "react-loader-spinner";

interface Props {
    className?: string;
}

export const LoadingSpinner: React.FC<Props> = ({className}) => {
    return (
        <div className={className}>
            <Loader
                type="ThreeDots"
                color="#1e4d2b"
            />
        </div>
    );
}
