import React, {useEffect} from "react";
import {PageTitle} from "../../components/Layout/PageTitle";
import {Col, Row} from "reactstrap";
import {APP_NAME} from "../../constants";
import {LoginForm} from "../../components/Account/LoginForm";
import {LoginRequest} from "../../utils/types";
import {useStoreActions} from "../../store";
import {useHistory} from "react-router-dom";

export const LogIn: React.FC = () => {

    useEffect(() => {
        document.title = `${APP_NAME} | Log In`;
    });

    const logIn = useStoreActions(actions => actions.logIn);
    const history = useHistory();

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
            console.error(error);
        }
    }
}
