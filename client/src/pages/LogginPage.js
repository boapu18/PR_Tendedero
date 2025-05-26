import React from "react";
import PurpleBackground from "../components/utils/PurpleBackground";
import LogginForm from "../components/auth/LogginForm";

function LogginPage() {
  return (
    <PurpleBackground>
      <div className="form-container">
        <div className="container py-4">
          <div className="p-1 p-md-5 m-0 m-md-2 rounded-0 shadow-none rounded-4 shadow bg-white">
            <h1 className="text-center mb-5">Tendedero Virtual de Denuncia</h1>
            <LogginForm/>
          </div>
        </div>
      </div>
    </PurpleBackground>
  );
}

export default LogginPage;