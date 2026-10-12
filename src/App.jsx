import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SvgSprite from './components/SvgSprite';
import Preloader from './components/Preloader';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import DiamondDetailPage from './pages/DiamondDetailPage';
import EducationPage from './pages/EducationPage';
import PoliciesPage from './pages/PoliciesPage';

export default function App() {
  return (
    <>
      <SvgSprite />
      <Preloader />
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/diamond/:id" element={<DiamondDetailPage />} />
        <Route path="/diamond" element={<DiamondDetailPage />} />
        <Route path="/education" element={<EducationPage />} />
        <Route path="/policies" element={<PoliciesPage />} />
        {/* Support legacy .html navigation seamlessly */}
        <Route path="/index.html" element={<Navigate to="/" replace />} />
        <Route path="/diamond.html" element={<Navigate to="/diamond" replace />} />
        <Route path="/education.html" element={<Navigate to="/education" replace />} />
        <Route path="/policies.html" element={<Navigate to="/policies" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </>
  );
}
