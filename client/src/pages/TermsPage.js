import React from 'react';
import PurpleBackground from "../components/utils/PurpleBackground";
import Terms from '../components/utils/Terms';

function TermsPage(){

    return(
        <PurpleBackground>
            <div className="container py-4">
                <div className="p-1 p-md-5 m-0 m-md-2 rounded-0 shadow-none rounded-4 shadow bg-white">
                    <Terms/>
                </div>
            </div>
        </PurpleBackground>
    );
}

export default TermsPage;