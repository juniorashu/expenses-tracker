import { Outlet } from 'react-router-dom';
import './Layout.css'; // Create this file for the styles
import Sidebar from './Sidebar';

export default function Layout() {
  return (
    <div className="app-container">
      <Outlet />
      <Sidebar />
    </div>
  );
}