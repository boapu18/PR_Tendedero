import React from "react";
import ReportForm from "../components/report/ReportForm";
import PurpleBackground from "../components/utils/PurpleBackground";

function FormPage() {
  return (
    <PurpleBackground>
      <div className="form-container">
        <div className="container py-4">
          <div className="d-none d-md-block bg-white shadow rounded-4 p-5 m-2">
            <ReportForm/>
          </div>
          <div className="d-block d-md-none p-1">
            <ReportForm/>
          </div>
        </div>
      </div>
    </PurpleBackground>
  );
}

export default FormPage;
