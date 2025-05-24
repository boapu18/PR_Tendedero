import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import axios from "axios";
import { Tooltip } from "bootstrap";

function LogginForm() {
  
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onLoggin = async (data) => {

    try {

      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, 
        data, {
        withCredentials: true
      });

      if (response) {
        window.location.reload();
      } else {
        throw new Error();
      }

    } catch (error) {

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
  }

  useEffect(() => {
    const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltips.forEach((tooltip) => new Tooltip(tooltip));
  }, []);

  return (
      <form className="d-flex flex-column align-items-center" onSubmit={handleSubmit(onLoggin)}>

          <h2 className="mt-5 mb-5">Iniciar Sesión</h2>

          <div className="mb-4 fixed-width-login-input">
            <label htmlFor="username" className="form-label text-start d-block">Usuario</label>
              <input
                  type="text"
                  className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                  id="username"
                  {...register("username", { required: "Este campo es obligatorio" })}
              />
              {errors.username && <div className="invalid-feedback">{errors.username.message}</div>}
          </div> 

          <div className="mb-4 fixed-width-login-input">
            <label htmlFor="password" className="form-label text-start d-block">Contraseña</label>
              <input
                  type="password"
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  id="password"
                  {...register("password", { required: "Este campo es obligatorio" })}
              />
              {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
          </div>

          <div className="mt-5 mb-5 text-center">
            <button type="submit" className="main-button">Iniciar Sesión</button>
          </div>

      </form> 
  );
}
export default LogginForm;
