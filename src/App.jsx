
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Portfolio from './Components/Features/portfolio/components/Portfolio.jsx';
import LiveCodePlayground from './Components/Features/tools/LiveCodePlayground.jsx';

// --- ADD THESE IMPORTS ---
import BlogPage from './Components/Features/Blog/BlogPage.jsx';
import BlogPost from './Components/Features/Blog/BlogPost.jsx';
import AdminPanel from './Components/Features/Admin/AdminPanel.jsx';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* Main Portfolio Page */}
          <Route path="/" element={<Portfolio />} />
          
          {/* Live Code Playground Page */}
          <Route path="/playground" element={<LiveCodePlayground />} />

          {/* --- ADD THE BLOG ROUTES --- */}
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/admin" element={<AdminPanel />} />
          
          {/* Catch-all route - redirect to home */}
          <Route path="*" element={<Portfolio />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;