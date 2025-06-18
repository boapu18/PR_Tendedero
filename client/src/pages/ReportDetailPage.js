import React from "react";
import ReportDetail from "../components/report/ReportDetail";
import PurpleBackground from "../components/utils/PurpleBackground";

function ReportDetailPage() {
    return (
        <PurpleBackground>
            <div className="form-container">
                <div className="container py-4">
                    <div className="p-1 p-md-5 m-0 m-md-2 rounded-0 shadow-none rounded-4 shadow bg-white">
                        <ReportDetail />
                    </div>
                </div>
            </div>
        </PurpleBackground>
    );
}

export default ReportDetailPage;
