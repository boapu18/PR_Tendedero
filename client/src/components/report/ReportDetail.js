import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { successAlert, errorAlert, confirmationAlert } from "../../utils/alertInvokers";

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
                setError(true);
                setLoading(false);
            });

    }, [id]);

    const handleChangeStatus = (e) => {

        const newState = parseInt(e.target.value);

        axios.patch(`${process.env.REACT_APP_API_URL}/report/${id}`, { state: newState }, { withCredentials: true })
            .then((response) => {
                setReportData(prev => ({ ...prev, state: newState }));
                successAlert(response.data.message);
            })
            .catch((error) => {
                errorAlert(error.response.data.message);
            });
    };

    const handleDeleteReport = async () => {

        const confirmation = await confirmationAlert("¿Está seguro que desea eliminar la denuncia?");

        try {

            if (confirmation){
                const response = await axios.delete(`${process.env.REACT_APP_API_URL}/report/${id}`, { withCredentials: true });
                successAlert(response.data.message, false, () => { handleBack(); });
            }
            
        } catch (error) {
            errorAlert(error.response.data.message);
        }
    }

    const handleBack = () => {
        window.history.back();
    };

    return (
        <>

            <div className="d-flex justify-content-center align-items-center">
                {loading && <p>Cargando...</p>}
                {error && 
                <div className="d-flex flex-column align-items-center">
                    <p className="mb-4">Ocurrió un error al cargar la denuncia</p>
                    <button className="cancel-button" onClick={handleBack}>
                        Regresar
                    </button>
                </div>
                }
            </div>

            {!loading && !error && reportData && (
                <>
                    <h2 className="mb-4 text-start">Detalle de Denuncia</h2>

                    <div className="mb-4 text-start">
                        <label className="form-label">Descripción</label>
                        <textarea
                            className="form-control"
                            rows={4}
                            value={reportData.content}
                            readOnly
                        />
                    </div>

                    <div className="mb-4 text-start">
                        <label className="form-label">Correo electrónico</label>
                        <input
                            type="email"
                            className="form-control fixed-width-email"
                            value={reportData.email || ""}
                            readOnly
                        />
                    </div>

                    <div className="row mb-0 mb-md-4 text-start">
                        <div className="col-auto me-4 mb-3 mb-lg-0">
                            <label className="form-label">Provincia</label>
                            <input
                                type="text"
                                className="form-control fixed-width-select"
                                value={reportData.province || ""}
                                readOnly
                            />
                        </div>

                        <div className="col-auto me-4 mb-3 mb-lg-0">
                            <label className="form-label">Cantón</label>
                            <input
                                type="text"
                                className="form-control fixed-width-select"
                                value={reportData.canton || ""}
                                readOnly
                            />
                        </div>

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

                    <div className="row mb-4 mb-lg-4 text-start">
                        <div className="col-auto me-4 mb-3 mb-lg-0">
                            <label className="form-label">Identidad de género</label>
                            <input
                                type="text"
                                className="form-control fixed-width-select"
                                value={reportData.genderIdentity || ""}
                                readOnly
                            />
                        </div>

                        <div className="col-auto me-4 mb-3 mb-lg-0">
                            <label className="form-label">Rol dentro de la institución</label>
                            <input
                                type="text"
                                className="form-control fixed-width-select"
                                value={reportData.roleInInstitution || ""}
                                readOnly
                            />
                        </div>

                        <div className="col-auto me-4 mb-3 mb-lg-0">
                            <label className="form-label">Fecha de creación</label>
                            <input
                                type="text"
                                className="form-control fixed-width-select"
                                value={new Date(reportData.creationDate).toLocaleString("es-CR")}
                                readOnly
                            />
                        </div>

                    </div>

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

                    <div className="d-flex justify-content-end">
                        <button className="btn btn-danger me-3" onClick={handleDeleteReport}>
                            Eliminar denuncia
                        </button>
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
