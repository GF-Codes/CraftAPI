import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Page404 from './pages/Page404';
import Mobs from './pages/Mobs';
import MobDetails from './pages/MobDetails';
import BasePage from './pages/BasePage';
import Equipment from './pages/Equipment';

function AppRoutes() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<BasePage />}>
                        <Route index element={<Home />}></Route>
                        <Route path="/mobs" element={<Mobs />}></Route>
                        <Route path="/detalhes-mob/:id" element={<MobDetails />} />
                        <Route path="/equipment" element={<Equipment />}></Route>
                        <Route path="*" element={<Page404 />}></Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default AppRoutes;