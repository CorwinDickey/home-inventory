import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App';
import axios from 'axios'

import history from './utils/history';
import accountService from './services/account'

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL
axios.defaults.headers.post['Content-Type'] = 'application/json'

accountService.refreshToken().finally(startApp)

function startApp() {
    render(
        <Router history={history}>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </Router>,
        document.getElementById('app')
    )
}

