import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavBar from "../components/navbars/AdminNavBar";

function AdminMainPage(){
    
    return (
        <div className="container-fluid">
            <div className="row">
                
                <div className="col-12 col-md-2">
                </div>
                
                <div className="col-12 col-md-8">
                    <AdminNavBar/>
                    <Outlet/>
                </div>

                <div className="col-12 col-md-2">
                </div>

            </div>
        </div>
    );
}

export default AdminMainPage;