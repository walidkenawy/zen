
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
import { AITripPlanner } from './pages/AITripPlanner';
import { Checkout } from './pages/Checkout';
import { BookingSuccess } from './pages/BookingSuccess';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

const App: React.FC = () => {
  return (
    <WishlistProvider>
      <CartProvider>
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
              <Route path="/trip-planner" element={<AITripPlanner />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/booking-success" element={<BookingSuccess />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </Layout>
        </Router>
      </CartProvider>
    </WishlistProvider>
  );
};

export default App;
