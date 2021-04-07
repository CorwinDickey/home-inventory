import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App';
import axios from 'axios'

import accountService from './services/account'

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL
axios.defaults.headers.post['Content-Type'] = 'application/json'

function axiosAuth(url) {
    const user = accountService.userValue
    const isLoggedIn = user && user.jwtToken
    const isApiUrl = url.startsWith(process.env.REACT_APP_SERVER_URL)
    if (isLoggedIn && isApiUrl) {
        return (
            axios.defaults.headers.common['Authorization'] = `Bearer ${user.jwtToken}`
        )
    } else {
        return null
    }
}

axiosAuth()

ReactDOM.render(
    <Router>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Router>,
    document.getElementById('root')
);
