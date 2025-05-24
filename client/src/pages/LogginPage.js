import React from "react";
import PurpleBackground from "../components/utils/PurpleBackground";
import LogginForm from "../components/auth/LogginForm";

function LogginPage() {
  return (
    <PurpleBackground>
      <div className="form-container">
        <div className="container py-4">
          <div className="d-none d-md-block bg-white shadow rounded-4 p-5 m-2">
            <h1 className="text-center mb-5">Tendedero Virtual de Denuncia</h1>
            <LogginForm/>
          </div>
          <div className="d-block d-md-none p-1">
            <h1 className="text-center mb-5">Tendedero Virtual de Denuncia</h1>
            <LogginForm/>
          </div>

        </div>
      </div>
    </PurpleBackground>
  );
}

export default LogginPage;