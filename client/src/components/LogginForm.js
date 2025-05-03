import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Tooltip } from "bootstrap";
import Swal from 'sweetalert2';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LogginForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate();

    const onLoggin = async (data) => {
      console.log(data);
      try {

        const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, data);

        if (response) {
          console.log(data);
          alert("Inicio de sesión exitoso");
          } else {
            throw new Error();
          }

      } catch (error) {

        const errorMessage = error.response?.data?.message ? error.response.data.message : "Contraseña o usuarios incorrectos";

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
    <div className="container py-4">
        <div className="bg-white shadow rounded-4 p-5" style={{ minHeight: '700px', display: "flex", flexDirection: "column", justifyContent: "start", alignItems: "center" }}>
          <h1 className="text-center mb-5" style={{marginBottom: "800"}}>Tendedero Virtual de Denuncia</h1>
            <form onSubmit={handleSubmit(onLoggin)}>
                <h2 className="mt-5 mb-5 text-center">Iniciar Sesión</h2>
                <div className="mb-3 text-center" style={{ width: "350px", maxWidth: '350px', margin: '0 auto' }}>
                  <label htmlFor="username" className="form-label text-start d-block">Usuario</label>
                    <input
                        type="text"
                        className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                        id="username"
                        {...register("username", { required: "Este campo es obligatorio" })}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Ingrese su nombre de usuario"
                    />
                    {errors.username && <div className="invalid-feedback">{errors.username.message}</div>}
                </div> 
                <div className="mb-3 text-center" style={{ width: "350px", maxWidth: '350px', margin: '0 auto' }}>
                  <label htmlFor="password" className="form-label text-start d-block">Contraseña</label>
                    <input
                        type="password"
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        id="password"
                        {...register("password", { required: "Este campo es obligatorio" })}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Ingrese su contraseña"
                    />
                    {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                </div>
                {/* Buttons */}
                <div className="mt-5 mb-5 text-center">
                        <button type="submit" className="main-button">Iniciar Sesión</button>
                </div>
            </form> 
        </div>
    </div>
  );
}
export default LogginForm;
