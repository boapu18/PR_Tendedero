import React, { useEffect, useState } from "react";
import LogginPage from "../pages/LogginPage";
import axios from "axios";
import Loader from "../components/utils/Loader";

function AdminProtectedRoute({ children }) {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        async function checkLoggedIn() {
            try {
                await axios.get(`${process.env.REACT_APP_API_URL}/auth/logged-in`, {
                    withCredentials: true,
                });
                setAuthenticated(true);
            } catch (e) {
                setAuthenticated(false);
            } finally {
                setLoading(false);
            }
        }

        checkLoggedIn();
    }, []);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <Loader />
            </div>
        );
    }

    if (authenticated) {
        return children;
    }

    return <LogginPage />;
}

export default AdminProtectedRoute;
