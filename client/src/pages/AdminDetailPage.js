import React from "react";
import ReportDetail from "../components/report/ReportDetail";
import PurpleBackground from "../components/utils/PurpleBackground";

function AdminDetailPage() {
  return (
    <PurpleBackground>
      <div className="form-container">
        <div className="container py-4">
          <div className="d-none d-md-block bg-white shadow rounded-4 p-5 m-2">
            <ReportDetail/>
          </div>
          <div className="d-block d-md-none p-1">
            <ReportDetail/>
          </div>
        </div>
      </div>
    </PurpleBackground>
  );
}

export default AdminDetailPage;
