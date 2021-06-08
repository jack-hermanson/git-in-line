import "./css/main.css";
import {StoreProvider} from "easy-peasy";
import {BrowserRouter, Route} from "react-router-dom";
import {store} from "./store";
import {Layout} from "./components/Layout/Layout";
import {Index as DashboardIndex} from "./pages/Dashboard/Index";

function App() {
    return (
        <StoreProvider store={store}>
            <BrowserRouter>
                <Layout>
                    <Route exact path="/" component={DashboardIndex} />
                </Layout>
            </BrowserRouter>
        </StoreProvider>
    );
}

export default App;
