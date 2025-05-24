import React from 'react';
import PurpleBackground from "../components/PurpleBackground";
import Terms from '../components/Terms';

function TermsPage(){

    return(
        <PurpleBackground>
            <div className="container py-4">
                <div className="d-none d-md-block bg-white shadow rounded-4 p-5 m-2">
                    <Terms/>
                </div>
                <div className="d-block d-md-none p-1">
                    <Terms/>
                </div>
            </div>
        </PurpleBackground>
    );
}

export default TermsPage;