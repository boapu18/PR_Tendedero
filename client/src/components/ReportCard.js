import React, { useMemo } from "react";
import { getReportFooterText } from "../utils/utils";

function ReportCard({ report }){

    const footerText = useMemo(() => {
        return getReportFooterText(report);
    }, [report]);
    
    return (
        <div className="mx-3 p-4 report-card-bg">
            <div>
                <p className="card-text">{ report.content }</p>
                <p className="card-text fw-bold">{ footerText }</p>
            </div>
        </div>
    );
}

export default ReportCard;