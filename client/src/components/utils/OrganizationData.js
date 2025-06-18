import React from "react";
import UNEDLogo from "../../assets/uned-logo.png";
import AMECLogo from "../../assets/amec-logo.png";
import LIITLogo from "../../assets/liit-logo.png";

function OrganizationData() {
    return (
        <div className="d-flex flex-column flex-md-row align-items-start gap-5 px-2">
            <div>
                <img src={AMECLogo} alt="Logo AMEC" className="img-fluid" />
                <p className="my-2 fw-light">Correo: redamec@uned.ac.cr</p>
            </div>

            <div>
                <img src={UNEDLogo} alt="Logo UNED" className="img-fluid" />
                <p className="my-2 fw-light">Teléfono: +506 2527-2000</p>
            </div>

            <div>
                <img src={LIITLogo} alt="Logo LIIT" className="img-fluid" />
                <p className="my-2 fw-light">Teléfono: +506 2234-3236 ext. 4621</p>
            </div>
        </div>
    );
}

export default OrganizationData;
