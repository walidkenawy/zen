
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Explore } from './pages/Explore';
import { RetreatDetail } from './pages/RetreatDetail';
import { Dashboard } from './pages/Dashboard';
import { OrganizerDashboard } from './pages/OrganizerDashboard';
import { About } from './pages/About';
import { CalendarPage } from './pages/CalendarPage';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/retreat/:slug" element={<RetreatDetail />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/organizer" element={<OrganizerDashboard />} />
          <Route path="/about" element={<About />} />
          {/* Fallback to Home for demo purposes */}
          <Route path="*" element={<Home />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
