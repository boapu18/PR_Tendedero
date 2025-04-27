import React from "react";
import PurpleBackground from "../components/PurpleBackground";
import LogginForm from "../components/LogginForm";

function LogginPage() {
  return (
    <PurpleBackground>
      <div className="form-container">
        <LogginForm/>
      </div>
    </PurpleBackground>
  );
}

export default LogginPage;