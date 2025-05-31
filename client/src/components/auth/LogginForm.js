import React from "react";
import { useForm } from "react-hook-form";
import { errorAlert } from "../../utils/alertInvokers";
import axios from "axios";

function LogginForm() {
  
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onLoggin = async (data) => {

    try {
      
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, 
        data, {
        withCredentials: true
      });

      window.location.reload();

    } catch (error) {

      const errorMessage = error.response?.data?.message ?? "Se produjo un error inesperado, intente nuevamente más tarde";
      errorAlert(errorMessage);
    }
  }

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
