import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom'
import App from './App';

import { history } from './utils/history';
// import { accountService } from './services/account'

// accountService.refreshToken().finally(startApp)

// function startApp() {
    ReactDOM.render(
        <Router history={history}>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </Router>,
        document.getElementById('root')
    )
// }
