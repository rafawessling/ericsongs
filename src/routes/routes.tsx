import { Route, Routes } from 'react-router-dom';
import { SignIn } from '../pages/SignIn/SignIn';
import { Home } from '../pages/Home/Home';

export const MainRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/home" element={<Home />} />
        </Routes>
    );
};
