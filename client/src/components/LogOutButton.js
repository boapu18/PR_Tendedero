import React from "react";
import axios from "axios";
import Swal from 'sweetalert2';

function LogOutButton(){

    const handleLogOutButtonClick = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/logout`, 
                {}, {
                withCredentials: true
            });

            if (response){
                window.location.reload();
            } else {
                throw new Error();
            }

        } catch (error){

            const errorMessage = error.response?.data?.message ? error.response.data.message : "Se produjo un error inesperado, intente nuevamente más tarde";

            Swal.fire({
                title: 'Error',
                text: errorMessage,
                background: '#ffe9e5',
                color: '#121212',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#dd2404',
                icon: 'error',
                customClass: {
                popup: 'custom-swal-popup',
                title: 'custom-swal-title',
                confirmButton: 'custom-swal-confirm'
                }
            });
        }
    };

    return(
        <button className="main-button" onClick={handleLogOutButtonClick}>Cerrar sesión</button>
    );
}

export default LogOutButton;