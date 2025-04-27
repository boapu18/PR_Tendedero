import React from "react";
import FormPage from "./pages/FormPage";
import ReportVisualizer from "./pages/ReportVisualizer";
import TermsPage from "./pages/TermsPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TermsProtectedRoute from "./protecters/TermsProtectedRoute";
import AdminMainPage from "./pages/AdminMainPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<TermsProtectedRoute><ReportVisualizer/></TermsProtectedRoute>}></Route>
          <Route path="report" element={<TermsProtectedRoute><FormPage/></TermsProtectedRoute>}></Route>
          <Route path="terms-of-use" element={<TermsPage/>}></Route>
        </Route>
        <Route path="/admin">
          <Route index element={<AdminMainPage/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
