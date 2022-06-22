import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { store } from './_helpers';
import { App } from './App';
import "./index.css"

// setup fake backend
// import { configureFakeBackend } from './_helpers';
// configureFakeBackend();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);