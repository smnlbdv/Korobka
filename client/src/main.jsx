import React from 'react'
import ReactDOM from 'react-dom/client'
import { StyleProvider } from '@ant-design/cssinjs';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import App from './App.jsx'
import './index.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StyleProvider hashPriority="high">
        <Router>
          <App/>
        </Router>
    </StyleProvider>
  </React.StrictMode>,
)
