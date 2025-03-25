import React from "react";
import NavBar from "../components/NavBar";
import ReportList from "../components/ReportList";

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
                </div>

            </div>
        </div>
    );
}

export default ReportVisualizer;