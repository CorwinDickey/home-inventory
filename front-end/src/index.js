import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App';
import axios from 'axios'

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL
axios.defaults.headers.post['Content-Type'] = 'application/json'

ReactDOM.render(
    <Router>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Router>,
    document.getElementById('root')
);
