import { Route, Routes } from 'react-router';
import './App.css';
import HomePage from './routes/home.route.jsx';
import NotFoudPage from './routes/not-found/not-found.route.jsx';
import DisconnectPage from './routes/disconnect/disconnect.route.jsx';
import ForgotPasswordPage from './routes/forgot-pwd/forgot-pwd.route.jsx';
import FeedPage from './routes/feed/feed.route.jsx';

function App() {

    return (
        <>
            <Routes>
                <Route index element={<HomePage />} />
                <Route path='/feed' element={<FeedPage />} />
                <Route path='/disconnected' element={<DisconnectPage />} />
                <Route path='/forgot-pwd' element={<ForgotPasswordPage />} />
                <Route path='*' element={<NotFoudPage />} />
            </Routes>
        </>
    )
}

export default App;
