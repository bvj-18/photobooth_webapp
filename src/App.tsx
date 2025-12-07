import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CameraPage from './pages/CameraPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/camera" element={<CameraPage />} />
    </Routes>
  );
}
