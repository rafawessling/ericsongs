import { Route, Routes } from 'react-router-dom';
import { SignIn } from '../pages/SignIn/SignIn';

export const MainRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<SignIn />} />
        </Routes>
    );
};
