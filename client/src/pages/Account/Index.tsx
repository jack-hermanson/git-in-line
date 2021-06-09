import React, {useEffect} from "react";
import {Col, Row} from "reactstrap";
import {PageTitle} from "../../components/Layout/PageTitle";
import {APP_NAME} from "../../constants";
import {useStoreState} from "../../store";
import {useHistory} from "react-router-dom";

export const Index: React.FC = () => {

    const currentUser = useStoreState(state => state.currentUser);
    const history = useHistory();

    useEffect(() => {
        document.title = `${APP_NAME} | Account`;
        if (!currentUser) {
            history.push("/account/login");
        }
    }, [currentUser, history]);

    return (
        <React.Fragment>
            {currentUser && (
                <React.Fragment>
                    <Row>
                        <Col>
                            <PageTitle text={currentUser.username} />
                        </Col>
                    </Row>
                </React.Fragment>
            )}
        </React.Fragment>
    );
}
