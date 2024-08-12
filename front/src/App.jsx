import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Admin from './admin';
import Quiz from './Quiz';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 text-gray-900">
        <nav className="bg-purple-700 text-white shadow-lg">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <div className="text-lg font-semibold">
              Flashcard Quiz App
            </div>
            <ul className="flex space-x-6">
              <li>
                <Link
                  to="/admin"
                  className="hover:text-yellow-300 transition"
                >
                  Admin Panel
                </Link>
              </li>
              <li>
                <Link
                  to="/quiz"
                  className="hover:text-yellow-300 transition"
                >
                  Quiz
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <div className="container mx-auto px-6 py-10">
          <Routes>
            <Route path="/admin" element={<Admin />} />
            <Route path="/quiz" element={<Quiz />} />
          </Routes>
        </div>

        <footer className="bg-purple-700 text-white py-4 text-center">
          © 2024 Flashcard Quiz App. All rights reserved.
        </footer>
      </div>
    </Router>
  );
}

export default App;
