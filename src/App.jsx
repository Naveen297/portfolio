

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Portfolio from './Components/Portfolio';
// import LiveCodePlayground from './Components/LiveCodePlayground';


// function App() {
//   return (
//     <Router>
//       <div>
//         <Routes>
//           {/* Main Portfolio Page */}
//           <Route path="/" element={<Portfolio />} />
          
//           {/* Live Code Playground Page */}
//           <Route path="/playground" element={<LiveCodePlayground />} />
          
//           {/* Catch all route - redirect to home */}
//           <Route path="*" element={<Portfolio />} />

//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Portfolio from './Components/Portfolio';
import LiveCodePlayground from './Components/LiveCodePlayground';

// --- ADD THESE IMPORTS ---
import BlogPage from './Components/BlogPage';
import BlogPost from './Components/BlogPost';
import AdminPanel from './Components/AdminPanel';

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