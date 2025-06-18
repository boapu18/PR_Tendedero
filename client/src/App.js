import React from "react";
import FormPage from "./pages/FormPage";
import ReportVisualizer from "./pages/ReportVisualizer";
import TermsPage from "./pages/TermsPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TermsProtectedRoute from "./protecters/TermsProtectedRoute";
import AdminMainPage from "./pages/AdminMainPage";
import AdminProtectedRoute from "./protecters/AdminProtectedRoute";
import ReportDetailPage from "./pages/ReportDetailPage";
import AdminReportTable from "./components/report/AdminReportTable";
import AdminSettings from "./components/admin/AdminSettings";
import ScrollToTop from "./components/utils/ScrollToTop";
import HeaderAndFooter from "./components/utils/HeaderAndFooter";
import AboutPage from "./pages/AboutPage";

function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<HeaderAndFooter />}>
                    <Route
                        index
                        element={
                            <TermsProtectedRoute>
                                <ReportVisualizer />
                            </TermsProtectedRoute>
                        }
                    ></Route>
                    <Route
                        path="report"
                        element={
                            <TermsProtectedRoute>
                                <FormPage />
                            </TermsProtectedRoute>
                        }
                    ></Route>
                    <Route path="terms-of-use" element={<TermsPage />}></Route>
                    <Route
                        path="about"
                        element={
                            <TermsProtectedRoute>
                                <AboutPage />
                            </TermsProtectedRoute>
                        }
                    ></Route>
                    <Route
                        path="amatista"
                        element={
                            <AdminProtectedRoute>
                                <AdminMainPage />
                            </AdminProtectedRoute>
                        }
                    >
                        <Route index element={<AdminReportTable />}></Route>
                        <Route path="config" element={<AdminSettings />}></Route>
                    </Route>
                    <Route
                        path="amatista/report/:id"
                        element={
                            <AdminProtectedRoute>
                                <ReportDetailPage />
                            </AdminProtectedRoute>
                        }
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
