import "./css/main.css";
import {StoreProvider} from "easy-peasy";
import {BrowserRouter, Route} from "react-router-dom";
import {store} from "./store";
import {Layout} from "./components/Layout/Layout";
import {Index as DashboardIndex} from "./pages/Dashboard/Index";
import {Index as PullRequestsIndex} from "./pages/PullRequests/Index";
import {Index as AccountIndex} from "./pages/Account/Index";
import {New as NewPullRequest} from "./pages/PullRequests/New";
import {LogIn} from "./pages/Account/LogIn";

function App() {
    return (
        <StoreProvider store={store}>
            <BrowserRouter>
                <Layout>
                    <Route exact path="/" component={DashboardIndex} />
                    <Route exact path="/pull-requests" component={PullRequestsIndex} />
                    <Route exact path="/pull-requests/new" component={NewPullRequest} />
                    <Route exact path="/account" component={AccountIndex} />
                    <Route exact path="/account/login" component={LogIn} />
                </Layout>
            </BrowserRouter>
        </StoreProvider>
    );
}

export default App;
