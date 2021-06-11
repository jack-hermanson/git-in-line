import "./css/main.css";
import {BrowserRouter, Route} from "react-router-dom";
import {Layout} from "./components/Layout/Layout";
import {Index as DashboardIndex} from "./pages/Dashboard/Index";
import {Index as PullRequestsIndex} from "./pages/PullRequests/Index";
import {Index as AccountIndex} from "./pages/Account/Index";
import {Create as NewPullRequest} from "./pages/PullRequests/Create";
import {LogIn} from "./pages/Account/LogIn";
import {Alerts} from "./components/Alerts/Alerts";
import {useEffect} from "react";
import {useStoreActions, useStoreState} from "./store";
import {SocketConnection} from "./components/Utils/SocketConnection";
import {Edit as EditPullRequest} from "./pages/PullRequests/Edit";

function App() {

    const loadPullRequests = useStoreActions(actions => actions.loadPullRequests);
    const currentUser = useStoreState(state => state.currentUser);
    const loadAccounts = useStoreActions(actions => actions.loadAccounts);

    useEffect(() => {
        loadPullRequests();
        if (currentUser?.token) {
            loadAccounts(currentUser.token);
        }
    }, [loadPullRequests, currentUser, loadAccounts]);

    return (
        <BrowserRouter>
            <SocketConnection />
            <Layout>
                <Alerts />

                <Route exact path="/" component={DashboardIndex} />
                <Route exact path="/pull-requests" component={PullRequestsIndex} />
                <Route exact path="/pull-requests/new" component={NewPullRequest} />
                <Route exact path="/pull-requests/edit/:id" component={EditPullRequest} />
                <Route exact path="/account" component={AccountIndex} />
                <Route exact path="/account/login" component={LogIn} />
            </Layout>
        </BrowserRouter>
    );
}

export default App;
