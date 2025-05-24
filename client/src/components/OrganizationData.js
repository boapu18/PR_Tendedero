import React from "react";
import UNEDLogo from "../assets/uned-logo.png";
import AMECLogo from "../assets/amec-logo.png";

function OrganizationData(){

    return(
        <div className="d-flex flex-column align-items-start px-2">
            <img
                src={AMECLogo}
                alt="Logo AMEC"
                className="img-fluid"
            />
            <p className="my-2 fw-light">Teléfono: <wbr/> +506</p>
            <img
                src={UNEDLogo}
                alt="Logo UNED"
                className="img-fluid"
            />
            <p className="my-2 fw-light">Teléfono: <wbr/> +506 2527-2000</p>
        </div>
    );
}

export default OrganizationData;