import { Navigate, Route, Routes } from 'react-router';
import './App.css';
import HomePage from './routes/home.route.jsx';
import NotFoudPage from './routes/not-found/not-found.route.jsx';
import DisconnectPage from './routes/disconnect/disconnect.route.jsx';
import ForgotPasswordPage from './routes/forgot-pwd/forgot-pwd.route.jsx';
import FeedPage from './routes/feed/feed.route.jsx';
import ProfilPage from './routes/profile/profile.route.jsx';
import { isAuthenticatedAtom } from './stores/auth.stores.js';
import { useAtom } from 'jotai';

function App() {
    const [isAuthenticated] = useAtom(isAuthenticatedAtom);

    return (
        <>
            <Routes>
                <Route index element={isAuthenticated ? <Navigate to={"/feed"} replace /> : <HomePage />} />
                <Route path='/feed' element={isAuthenticated ? <FeedPage /> : <Navigate to="/" replace />} />
                <Route path='/profile' element={isAuthenticated ? <ProfilPage /> : <Navigate to="/" replace />} />
                <Route path='/disconnected' element={<DisconnectPage />} />
                <Route path='/forgot-pwd' element={<ForgotPasswordPage />} />
                <Route path='*' element={<NotFoudPage />} />
            </Routes>
        </>
    )
}

export default App;
