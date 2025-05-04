import React from "react";
import FormPage from "./pages/FormPage";
import ReportVisualizer from "./pages/ReportVisualizer";
import TermsPage from "./pages/TermsPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TermsProtectedRoute from "./protecters/TermsProtectedRoute";
import AdminMainPage from "./pages/AdminMainPage";
import AdminProtectedRoute from "./protecters/AdminProtectedRoute";
import AdminDetailPage from "./pages/AdminDetailPage";

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
          <Route index element={<AdminProtectedRoute><AdminMainPage/></AdminProtectedRoute>}></Route>
          <Route path="report/:id" element={<AdminProtectedRoute><AdminDetailPage/></AdminProtectedRoute>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
