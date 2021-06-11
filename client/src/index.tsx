import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {store} from "./store";
import {StoreProvider} from "easy-peasy";

ReactDOM.render(
    <React.Fragment>
        <StoreProvider store={store}>
            <App/>
        </StoreProvider>
    </React.Fragment>,
    document.getElementById('root')
);

