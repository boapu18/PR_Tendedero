import React from "react";
import LogOutButton from "./LogOutButton";

function AdminNavBar(){

    return (
        <div className="border-bottom border-1 border-dark sticky-top" style={{backgroundColor: "white"}}>
            <div className="d-flex justify-content-between align-items-center mx-2" style={{minHeight: "100px"}}>
                <h1>Tendedero Virtual de Denuncia</h1>
                <LogOutButton/>
            </div>
        </div>
    );
}

export default AdminNavBar;