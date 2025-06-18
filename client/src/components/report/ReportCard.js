import React from "react";
import clip from "../../assets/clip.png";

function ReportCard({ report }) {
    return (
        <div className="mx-3 px-4 pb-4 pt-0 report-card-container">
            <img src={clip} alt="Clip" className="clip-img" />
            <div className="report-card-content shadow">
                <p className="card-text text-wrap text-break">{report.content}</p>
            </div>
        </div>
    );
}

export default ReportCard;
