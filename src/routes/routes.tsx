import { Route, Routes } from 'react-router-dom';
import { SignIn } from '../pages/SignIn/SignIn';
import { Home } from '../pages/Home/Home';
import { NotFound } from '../pages/NotFound/NotFound';

export const MainRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/home" element={<Home />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};
