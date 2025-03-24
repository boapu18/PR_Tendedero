import React from "react";
import ReportForm from "../components/ReportForm";
import PurpleBackground from "../components/PurpleBackground";
import "../App.css";

function FormPage() {
  return (
    <PurpleBackground>
      <div className="form-container">
        <ReportForm />
      </div>
    </PurpleBackground>
  );
}

export default FormPage;
