import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Admin from './admin';
import Quiz from './Quiz';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/admin">Admin Panel</Link></li>
            <li><Link to="/quiz">Quiz</Link></li>
          </ul>
        </nav>

        {/* Use Routes to wrap Route components */}
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
