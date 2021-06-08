import "./css/main.css";
import {StoreProvider} from "easy-peasy";
import {BrowserRouter, Route} from "react-router-dom";
import {store} from "./store";
import {Layout} from "./components/Layout/Layout";

function App() {
    return (
        <StoreProvider store={store}>
            <BrowserRouter>
                <Layout>
                    <h1>inside layout</h1>
                </Layout>
                <div className="footer">
                    <p>test</p>
                </div>
            </BrowserRouter>
        </StoreProvider>
    );
}

export default App;
