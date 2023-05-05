import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home';
import DashboradPage from './pages/Dashboard';
import CoinPage from './pages/CoinPage';
import ComparePage from './pages/ComparePage';
import Watchlist from './pages/Watchlist';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/dashboard' element={<DashboradPage />} />
            <Route path='coin/:id' element={<CoinPage/>}/>
            <Route path='/compare' element={<ComparePage />} />
            <Route path='/watchlist' element={<Watchlist/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
