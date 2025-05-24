import React from "react";
import NavBar from "../components/ClientNavBar";
import ReportList from "../components/ReportList";
import OrganizationData from "../components/OrganizationData";

function ReportVisualizer(){
    
    return (
        <div className="container-fluid">
            <div className="row">
                
                <div className="col-12 col-md-2">
                </div>
                
                <div className="col-12 col-md-8">
                    <NavBar/>
                    <ReportList/>
                </div>

                <div className="col-12 col-md-2">
                    <div className="d-none d-xl-block col-xl-2">
                        <div className="position-fixed bottom-0">
                            <OrganizationData />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ReportVisualizer;