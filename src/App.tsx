
import React from 'react';

import './styles/style.css';
import Home from './pages/Home';
import { BrowserRouter, Navigate, Outlet, Route, Router, Routes } from 'react-router-dom';
import Authencation from './pages/Authentication';
import { AuthProvider } from './hooks/Auth';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Forgot } from './pages/Forgot';
import PrivateRoute from './hooks/PrivateRoute';
import Manager from './pages/Manager';
import { Dashboard } from './pages/Dashboard';
import { jwtDecode } from 'jwt-decode';
import User from './pages/User';
import Users from './pages/Users';
import { Buildings } from './pages/Buildings';
import About from './pages/About';
import Categories from './pages/Categories';
import Legal from './pages/Legal';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";
import { WsStomp } from './hooks/WSStomp';
import { MaskProvider } from './hooks/InputMask';
import { OfflineProvider } from './hooks/Offline';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const App: React.FC = () => {
  return (
    <BrowserRouter basename="/start">
      <AuthProvider>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/auth" element={<OfflineProvider><Authencation /></OfflineProvider>}>
            <Route path='forgot' element={<Forgot />} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='' element={<Navigate to="login" replace />} />
          </Route>
          <Route path='/dash' element={
            <OfflineProvider>
              <Dashboard />
            </OfflineProvider>}   >
            <Route path='manager' element={
              <PrivateRoute roles={['manager', 'admin']}>
                <WsStomp>
                  <MaskProvider>
                    <Manager />
                  </MaskProvider>
                </WsStomp>
              </PrivateRoute>
            }>
              <Route path="users" element={<Users />} />
              <Route path="buildings" element={<Buildings />} />
              <Route path="categories" element={<Categories />} />
              <Route path="legal" element={<Legal />} />

              <Route path='about' element={<About />} />
              <Route path='' element={<Navigate to="users" replace />} />
            </Route>
            <Route path='user' element={<User></User>}></Route>
          </Route>
          <Route path='*' element={<Navigate to="/home" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter >
  );
};

export default App;
