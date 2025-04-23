// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import Dashboard from './Dashboard';
import PublicProfile from './PublicProfile'; // ✅ Import the public view page
import PrivacyPolicy from './PrivacyPolicy'; // ✅ Import the privacy policy page

export default function AppWithRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile/:uid" element={<PublicProfile />} /> {/* ✅ New route */}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} /> {/* ✅ New route for Privacy Policy */}
      </Routes>
    </Router>
  );
}
