import React from "react";
import csuSignature from "../../images/csu-signature.svg";

export const Header: React.FC = () => {
    return (
        <div className="header">
            <div className="container">
                <div className="logo-container">
                    <img className="csu-logo" alt="logo" src={csuSignature} />
                    <div className="app-name">
                        Git In Line
                    </div>
                </div>
            </div>
        </div>
    );
}
