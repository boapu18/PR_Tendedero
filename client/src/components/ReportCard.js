import React from "react";

function ReportCard({ report }){
    
    return (
        <div className="mx-3 p-4 report-card-bg">
            <div>
                <p className="card-text text-wrap text-break">{ report.content }</p>
            </div>
        </div>
    );
}

export default ReportCard;