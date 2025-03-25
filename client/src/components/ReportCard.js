import React from "react";

function ReportCard({ reportMainText, reportFooterText }){
    
    return (
        <div className="mx-3 p-4 report-card-bg">
            <div>
                <p className="card-text">{ reportMainText }</p>
                <p className="card-text fw-bold">{ reportFooterText }</p>
            </div>
        </div>
    );
}

export default ReportCard;