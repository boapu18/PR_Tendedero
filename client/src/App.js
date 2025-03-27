import React from "react";
import FormPage from "./pages/FormPage";
import ReportVisualizer from "./pages/ReportVisualizer";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path="home" element={<ReportVisualizer/>}></Route>
          <Route path="report" element={<FormPage/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
