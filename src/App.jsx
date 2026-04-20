import { Navigate, Route, Routes } from 'react-router';
import './App.css';
import HomePage from './routes/home.route.jsx';
import NotFoudPage from './routes/not-found/not-found.route.jsx';
import DisconnectPage from './routes/disconnect/disconnect.route.jsx';
import ForgotPasswordPage from './routes/forgot-pwd/forgot-pwd.route.jsx';
import FeedPage from './routes/feed/feed.route.jsx';
import ProfilPage from './routes/profile/profile.route.jsx';
import { isAuthenticatedAtom, tokenAtom } from './stores/auth.stores.js';
import { useAtom } from 'jotai';
import UserPage from './routes/user/user.route.jsx';
import MessagesPage from './routes/messages/messages.route.jsx';
import OtherUserProfilPage from './routes/otherProfile/otherProfile.route.jsx';

function App() {
    const [isAuthenticated] = useAtom(isAuthenticatedAtom);
    const [token] = useAtom(tokenAtom);

    if (token === undefined) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Routes>
                <Route index element={isAuthenticated ? <Navigate to={"/feed"} replace /> : <HomePage />} />
                <Route path='/feed' element={isAuthenticated ? <FeedPage /> : <Navigate to="/" replace />} />
                <Route path='/profile' element={isAuthenticated ? <ProfilPage /> : <Navigate to="/" replace />} />
                <Route path='/profile/:userId' element={isAuthenticated ? <OtherUserProfilPage /> : <Navigate to="/" replace />} />
                <Route path='/user' element={isAuthenticated ? <UserPage /> : <Navigate to="/" replace />} />
                <Route path='/messages' element={isAuthenticated ? <MessagesPage /> : <Navigate to="/" replace />} />
                <Route path='/disconnected' element={<DisconnectPage />} />
                <Route path='/forgot-pwd' element={<ForgotPasswordPage />} />
                <Route path='*' element={<NotFoudPage />} />
            </Routes>
        </>
    )
}

export default App;
