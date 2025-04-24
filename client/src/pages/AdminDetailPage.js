import React from "react";
import ReportDetail from "../components/ReportDetail";
import PurpleBackground from "../components/PurpleBackground";
import "../App.css";

function AdminDetailPage() {
  return (
    <PurpleBackground>
      <div className="form-container">
        <ReportDetail />
      </div>
    </PurpleBackground>
  );
}

export default AdminDetailPage;
