import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; 
import axios from "axios";
import Swal from "sweetalert2";

const states = {
    0: "En espera",
    1: "Aceptada",
    2: "Archivada"
};

function DetailReport() {

    const { id } = useParams(); 
    const [reportData, setReportData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    
    useEffect(() => {
        setLoading(true);
        setError(false);
    
        axios.get(`${process.env.REACT_APP_API_URL}/report/${id}`, { withCredentials: true })
          .then(response => {
            setReportData(response.data.data);
            setLoading(false);
          })
          .catch(err => {
            console.error("Error cargando la denuncia:", err);
            setError(true);
            setLoading(false);
          });
      }, [id]);

    
    const handleChangeStatus = (e) => {
        const newState = parseInt(e.target.value);
      
        axios.patch(`${process.env.REACT_APP_API_URL}/report/${id}`, { state: newState }, { withCredentials: true })
          .then(() => {
            Swal.fire({
              title: 'Éxito',
              text: 'Estado actualizado correctamente',
              background: '#e6ffe6',
              color: '#121212',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#0FCB06', 
              icon: 'success',
              customClass: {
                popup: 'custom-swal-popup',
                title: 'custom-swal-title',
                confirmButton: 'custom-swal-confirm'
              }
            });
            setReportData(prev => ({ ...prev, state: newState }));
          })
          .catch(() => {
            Swal.fire({
              title: 'Error',
              text: 'No se pudo actualizar el estado',
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
          });
      };

    const handleBack = () => {
        window.history.back();
    };

    const handleBackError = () => {
        window.history.back();
    }


    return (
        <>
                {/* Loader */}
                {loading && <p className="my-5">Cargando denuncia...</p>}
    
                {/* Error */}
                {!loading && error && (
                    <div>
                        <p className="text-danger my-5">Ocurrió un error al cargar la denuncia.</p>
                        <button className="cancel-button" onClick={handleBackError}>
                            Regresar
                        </button>
                    </div>
                )}

    
                {/* Main content */}
                {!loading && !error && reportData && (
                    <>
                        <h2 className="mb-4 text-start">Detalle de Denuncia</h2>
    
                        {/* Description */}
                        <div className="mb-4 text-start">
                            <label className="form-label">Descripción</label>
                            <textarea
                                className="form-control"
                                rows={4}
                                value={reportData.content}
                                readOnly
                            />
                        </div>
    
                        {/* Email */}
                        <div className="mb-4 text-start">
                            <label className="form-label">Correo electrónico</label>
                            <input
                                type="email"
                                className="form-control fixed-width-email"
                                value={reportData.email || ""}
                                readOnly
                            />
                        </div>
    
                        {/* Province */}
                        <div className="row mb-4 text-start">
                            <div className="col-auto me-4 mb-3 mb-lg-0">
                                <label className="form-label">Provincia</label>
                                <input
                                    type="text"
                                    className="form-control fixed-width-select"
                                    value={reportData.province || ""}
                                    readOnly
                                />
                            </div>
    
                            {/* Canton */}
                            <div className="col-auto me-4 mb-3 mb-lg-0">
                                <label className="form-label">Cantón</label>
                                <input
                                    type="text"
                                    className="form-control fixed-width-select"
                                    value={reportData.canton || ""}
                                    readOnly
                                />
                            </div>
    
                            {/* Age */}
                            <div className="col-auto me-4 mb-3 mb-lg-0">
                                <label className="form-label">Rango de edad</label>
                                <input
                                    type="text"
                                    className="form-control fixed-width-select"
                                    value={reportData.ageBracket || ""}
                                    readOnly
                                />
                            </div>
                        </div>
    
                        {/* State*/}
                        <div className="d-flex flex-column align-items-end mb-5">
                            <div style={{ width: "200px" }}>
                                <label className="form-label">Estado</label>
                                <select
                                    className="form-select"
                                    value={reportData.state}
                                    onChange={handleChangeStatus}
                                >
                                    {Object.entries(states).map(([key, value]) => (
                                        <option key={key} value={key}>
                                            {value}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
    
                        {/* Button*/}
                        <div className="d-flex justify-content-end">
                            <button className="cancel-button" onClick={handleBack}>
                                Regresar
                            </button>
                        </div>
                    </>
                )}
        </>
    );
}

export default DetailReport;
