import React from "react";
import ClientNavBar from "../components/navbars/ClientNavBar";
import ReportList from "../components/report/ReportList";

function ReportVisualizer() {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 col-md-2"></div>

                <div className="col-12 col-md-8">
                    <ClientNavBar />
                    <ReportList />
                </div>

                <div className="col-12 col-md-2"></div>
            </div>
        </div>
    );
}

export default ReportVisualizer;
