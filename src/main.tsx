import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { MainRoutes } from './routes/routes.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import './index.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <MainRoutes />
            </BrowserRouter>
        </Provider>
    </StrictMode>
);
