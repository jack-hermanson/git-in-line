import React, { useEffect } from "react";
import { PageTitle } from "../../components/Layout/PageTitle";
import { Col, Row } from "reactstrap";
import { APP_NAME } from "../../utils/constants";
import { LoginForm } from "../../components/Account/LoginForm";
import { useStoreActions } from "../../store";
import { useHistory } from "react-router-dom";
import { LoginRequest } from "../../../../shared/src/resource_models/account";
import { scrollToTop } from "../../utils/utils";

export const LogIn: React.FC = () => {
    const logIn = useStoreActions((actions) => actions.logIn);
    const history = useHistory();

    useEffect(() => {
        document.title = `${APP_NAME} | Log In`;
    });

    return (
        <React.Fragment>
            <Row>
                <Col>
                    <PageTitle text="Log In" />
                </Col>
            </Row>
            <Row>
                <Col lg={6}>
                    <LoginForm onSubmit={submitLoginRequest} />
                </Col>
            </Row>
        </React.Fragment>
    );

    async function submitLoginRequest(loginRequest: LoginRequest) {
        try {
            await logIn(loginRequest);
            history.push("/account");
        } catch (error) {
            scrollToTop();
        }
    }
};
