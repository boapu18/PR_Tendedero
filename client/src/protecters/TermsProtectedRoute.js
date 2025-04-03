import React from 'react';
import { Navigate } from 'react-router-dom';

function TermsProtectedRoute({ children }){

    if (localStorage.getItem("tendedero-terms-of-use-accepted")){
        return children;
    }

    return <Navigate to="/terms-of-use"/>
}

export default TermsProtectedRoute;

