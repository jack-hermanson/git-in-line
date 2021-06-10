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
import {useStoreActions} from "./store";

function App() {

    const loadPullRequests = useStoreActions(actions => actions.loadPullRequests);

    useEffect(() => {
        loadPullRequests();
    });

    return (
        <BrowserRouter>
            <Layout>
                <Alerts />

                <Route exact path="/" component={DashboardIndex} />
                <Route exact path="/pull-requests" component={PullRequestsIndex} />
                <Route exact path="/pull-requests/new" component={NewPullRequest} />
                <Route exact path="/account" component={AccountIndex} />
                <Route exact path="/account/login" component={LogIn} />
            </Layout>
        </BrowserRouter>
    );
}

export default App;
