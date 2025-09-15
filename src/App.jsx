import { Route, Routes } from 'react-router';
import './App.css';
import HomePage from './routes/home.route.jsx';
import LoginPage from './components/login/login.jsx';
import RegisterPage from './components/register/register.jsx';

function App() {

    return (
        <>
            <Routes>
                <Route index element={<HomePage />} />
                {/* <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<RegisterPage />} /> */}
            </Routes>
        </>
    )
}

export default App;
