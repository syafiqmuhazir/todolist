import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Footer } from "./Component/Footer";
import { Navbar } from "./Component/Navbar";
const Dashboard = lazy(() => import("./Container/Dashboard"));
const DetailActivity = lazy(() => import("./Container/DetailActivity"));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/detail/:id" element={<DetailActivity />} />
        </Routes>
        <Footer />
      </Suspense>
    </Router>
  );
}

export default App;
