import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import BrRouter from './BrRouter.jsx'


createRoot(document.getElementById('root')).render(
<BrowserRouter>
    <BrRouter/>
</BrowserRouter>
)
