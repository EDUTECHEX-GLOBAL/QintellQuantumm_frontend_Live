import './global.css';
import { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './components/Home';
import Contact from './components/Contact';
import api from './api';

// Lazy admin imports
const AdminLogin = lazy(() => import('./AdminDashboard/pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./AdminDashboard/pages/AdminDashboard'));
const PrivateRoute = lazy(() => import('./AdminDashboard/components/PrivateRoute'));
const HomeDashboard = lazy(() => import('./AdminDashboard/components/Home'));
const ContactList = lazy(() => import('./AdminDashboard/components/ContactList'));
const SubscriptionList = lazy(() => import('./AdminDashboard/components/SubscriptionList'));
const VisitorsList = lazy(() => import('./AdminDashboard/components/VisitorsList'));
const Newsletter = lazy(() => import('./AdminDashboard/components/Newsletter'));

const VISIT_TRACK_KEY = 'qintell_visit_logged';

export default function App() {
  const location = useLocation();

  // Track real visitors once per browser session (skips /admin routes)
  useEffect(() => {
    if (location.pathname.startsWith('/admin')) return;
    if (sessionStorage.getItem(VISIT_TRACK_KEY)) return;

    sessionStorage.setItem(VISIT_TRACK_KEY, '1');

    api.post('/api/admin-visitors/admin-visitor').catch((err) => {
      console.error('Visitor tracking failed:', err.message);
    });
  }, [location.pathname]);

  // Scroll to the section matching the URL hash whenever the
  // pathname or hash changes (covers both same-page nav clicks
  // and navigating in from another route, e.g. /contact -> /#vision)
  useEffect(() => {
    if (!location.hash) {
      return;
    }

    const id = location.hash.replace('#', '');

    // Delay slightly so the target route's content has mounted
    // before we try to find the element and scroll to it.
    const timeoutId = setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [location.pathname, location.hash]);

  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/admin-login" element={<AdminLogin />} />

        <Route path="/admin-dashboard" element={<PrivateRoute />}>
          <Route element={<AdminDashboard />}>
            <Route index element={<HomeDashboard />} />
            <Route path="admin-home" element={<HomeDashboard />} />
            <Route path="admin-contact" element={<ContactList />} />
            <Route path="admin-subscribe" element={<SubscriptionList />} />
            <Route path="admin-visitors" element={<VisitorsList />} />
            <Route path="admin-newsletter" element={<Newsletter />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}