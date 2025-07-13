import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import AlignmentCheckPage from './pages/AlignmentCheckPage';
import SizeComparisonPage from './pages/SizeComparisonPage';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans flex flex-col dark:bg-gray-900 dark:text-gray-100">
      <header className="bg-white shadow-md dark:bg-gray-800">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Webfont Checker</h1>
            <p className="text-gray-600 mt-1 text-sm dark:text-gray-400">
              A tool for designers and developers.
            </p>
          </div>
          <Navigation />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 flex-grow">
        <Routes>
          <Route path="/" element={<AlignmentCheckPage />} />
          <Route path="/size-comparison" element={<SizeComparisonPage />} />
        </Routes>
      </main>

      <footer className="bg-white mt-8 py-4 shadow-inner dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm dark:text-gray-400">
          <p>Built by Gemini.</p>
        </div>
      </footer>
    </div>
  );
}
