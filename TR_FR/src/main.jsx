import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import BrRouter from './BrRouter.jsx'
import {BrowserView, MobileView} from 'react-device-detect'
import MobilePage from './MobilePage.jsx';


createRoot(document.getElementById('root')).render(
    <>
        <BrowserView>
            <BrowserRouter>
                <BrRouter/>
            </BrowserRouter>
        </BrowserView>

        <MobileView>
            <MobilePage></MobilePage>
        </MobileView>
    </>
)