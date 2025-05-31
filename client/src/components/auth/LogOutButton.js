import React from "react";
import axios from "axios";
import { errorAlert } from "../../utils/alertInvokers";
import { useNavigate } from "react-router-dom";

function LogOutButton(){

    const navigate = useNavigate();

    const handleLogOutButtonClick = async () => {

        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/auth/logout`, 
                {}, {
                withCredentials: true
            });

            navigate("/admin");
            window.location.reload();

        } catch (error){

            const errorMessage = error.response?.data?.message ?? "Se produjo un error inesperado, intente nuevamente más tarde";
            errorAlert(errorMessage);
        }
    };

    return(
        <button className="main-button" onClick={handleLogOutButtonClick}>Cerrar sesión</button>
    );
}

export default LogOutButton;