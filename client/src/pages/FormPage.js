import React from "react";
import ReportForm from "../components/ReportForm";
import PurpleBackground from "../components/PurpleBackground";

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
