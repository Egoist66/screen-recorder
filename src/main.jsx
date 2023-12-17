import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.jsx'

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './styles/index.css'
import { RecorderContext } from './hooks/AppContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(


  <RecorderContext>

    <App />

  </RecorderContext>

  
)
