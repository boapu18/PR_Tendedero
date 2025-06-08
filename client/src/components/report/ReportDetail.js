import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { successAlert, errorAlert, confirmationAlert } from "../../utils/alertInvokers";
import { REPORT_STATES, DEFAULT_ERROR_MESSAGE } from "../../utils/constants";
import Loader from "../utils/Loader";

function DetailReport() {

    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [reportData, setReportData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [loadingErrorMessage, setLoadingErrorMessage] = useState("");

    useEffect(() => {

        setLoading(true);
        setError(false);

        axios.get(`${process.env.REACT_APP_API_URL}/report/${id}`, { withCredentials: true })
            .then(response => {
                setReportData(response.data.data);
                setLoading(false);
            })
            .catch(err => {
                setLoadingErrorMessage(err.response?.data?.message ?? DEFAULT_ERROR_MESSAGE);
                setError(true);
                setLoading(false);
            });

    }, [id]);

    // Actualiza el estado de la denuncia
    const handleChangeStatus = (e) => {

        const newState = parseInt(e.target.value);

        axios.patch(`${process.env.REACT_APP_API_URL}/report/${id}`, { state: newState }, { withCredentials: true })
            .then((response) => {
                setReportData(prev => ({ ...prev, state: newState }));
                successAlert(response.data.message);
            })
            .catch((error) => {
                errorAlert(error.response?.data?.message ?? DEFAULT_ERROR_MESSAGE);
            });
    };

    // Elimina la denuncia
    // Primero despliega el modal para pedir la confirmación al usuario
    const handleDeleteReport = async () => {

        const confirmation = await confirmationAlert("¿Está seguro que desea eliminar la denuncia?");

        try {

            if (confirmation){
                const response = await axios.delete(`${process.env.REACT_APP_API_URL}/report/${id}`, { withCredentials: true });
                successAlert(response.data.message, false, () => { handleBack(); });
            }
            
        } catch (error) {
            errorAlert(error.response?.data?.message ?? DEFAULT_ERROR_MESSAGE);
        }
    }

    const handleBack = () => {
        if (location.state?.from === "table") {
            window.history.back();
        } else {
            navigate("/admin");
        }
    };

    return (
        <>

            <div className={`d-flex justify-content-center align-items-center ${loading || error ? "vh-100" : ""}`}>
                {loading && <Loader/>}
                {error && 
                    <div className="d-flex flex-column align-items-center">
                        <p className="mb-4 text-center">{loadingErrorMessage}</p>
                        <button className="cancel-button" onClick={handleBack}>
                            Regresar
                        </button>
                    </div>
                }
            </div>

            {!loading && !error && reportData && (
                <>
                    <h2 className="text-start">Detalle de Denuncia</h2>
                    <p className="text-muted mb-4">Fecha de registro: {new Date(reportData.creationDate).toLocaleString("es-CR")}</p>

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

                        <div className="col-12 col-md mb-4 mb-lg-0">
                            <label className="form-label">Provincia</label>
                            <input
                                type="text"
                                className="form-control"
                                value={reportData.province || ""}
                                readOnly
                            />
                        </div>

                        <div className="col-12 col-md mb-4 mb-lg-0">
                            <label className="form-label">Cantón</label>
                            <input
                                type="text"
                                className="form-control"
                                value={reportData.canton || ""}
                                readOnly
                            />
                        </div>

                        <div className="col-12 col-md mb-4 mb-lg-0">
                            <label className="form-label">Rango de edad</label>
                            <input
                                type="text"
                                className="form-control"
                                value={reportData.ageBracket || ""}
                                readOnly
                            />
                        </div>
                    </div>

                    <div className="row mb-4 mb-lg-4 text-start">

                        <div className="col-12 col-md mb-4 mb-lg-0">
                            <label className="form-label">Identidad de género</label>
                            <input
                                type="text"
                                className="form-control"
                                value={reportData.genderIdentity || ""}
                                readOnly
                            />
                        </div>

                        <div className="col-12 col-md mb-4 mb-lg-0">
                            <label className="form-label">Rol dentro de la institución</label>
                            <input
                                type="text"
                                className="form-control"
                                value={reportData.roleInInstitution || ""}
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
                                {Object.entries(REPORT_STATES).map(([key, value]) => (
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
