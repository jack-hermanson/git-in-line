import React, { useEffect } from "react";
import { Col, Row } from "reactstrap";
import { PageTitle } from "../../components/Layout/PageTitle";
import { APP_NAME } from "../../utils/constants";
import { useStoreActions, useStoreState } from "../../store";
import { useHistory } from "react-router-dom";
import { PullRequest } from "../../components/PullRequest/PullRequest";
import { AccountDetailsForm } from "../../components/Account/AccountDetailsForm";
import { capitalizeFirstLetter, scrollToTop } from "../../utils/utils";

export const Index: React.FC = () => {
    const currentUser = useStoreState((state) => state.currentUser);
    const pullRequests = useStoreState((state) => state.pullRequests);
    const editAccount = useStoreActions((actions) => actions.editAccount);
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
                <Row>
                    <Col>
                        <PageTitle
                            text={capitalizeFirstLetter(currentUser.username)}
                        />
                    </Col>
                </Row>
            )}
            {pullRequests && currentUser && (
                <Row>
                    <Col lg={6} className="mb-3 mb-lg-0">
                        <div className="sticky-top">
                            <h4>Account Details</h4>
                            <AccountDetailsForm
                                account={currentUser}
                                onSubmit={async (editedAccount) => {
                                    console.log("submit");
                                    if (currentUser?.token) {
                                        try {
                                            await editAccount({
                                                token: currentUser.token,
                                                editedAccount: editedAccount,
                                            });
                                        } catch (error) {
                                            scrollToTop();
                                        }
                                    }
                                }}
                            />
                        </div>
                    </Col>
                    <Col lg={6}>
                        <h4>My Pull Requests</h4>
                        {pullRequests
                            .filter((o) => o.accountId === currentUser.id)
                            .map((pr) => (
                                <PullRequest key={pr.id} pullRequest={pr} />
                            ))}
                    </Col>
                </Row>
            )}
        </React.Fragment>
    );
};
