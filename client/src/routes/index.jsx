import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../views/appViews/home';

const AppRoutes = () => {
    return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
    )
}

export default AppRoutes;