import {Routes, Route} from 'react-router-dom'
import App from './App.jsx'
import LogInPage from './LogInPage.jsx'

const BrRouter = () => {
    return(
        <Routes>
            <Route path='/' element={<App />}></Route>
            <Route path='/login' element={<LogInPage />}></Route>
        </Routes>
    )
}

export default BrRouter;