import React, { useEffect, useCallback, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { successAlert, errorAlert } from "../../utils/alertInvokers";

function AdminSettings() {
    
    const { register, setValue, watch, handleSubmit } = useForm();
    const [loadingSettings, setLoadingSettings] = useState(false);
    const [error, setError] = useState(false);

    const showExternalFormLink = watch("showExternalFormLink");

    const fetchSettings = useCallback(async () => {

        setLoadingSettings(true);

        try {

            const response = await axios.get(`${process.env.REACT_APP_API_URL}/settings`);

            const newSettings = response.data.data.settings;

            newSettings.forEach(setting => {
                setValue(setting.name, setting.value);
            });

        } catch (e) {
            setError(true);
        } finally {
            setLoadingSettings(false);
        }
    }, [setValue]);

    useEffect(() => {
        fetchSettings();
    }, [fetchSettings]);


    const onSubmit = async (data) => {
        
        const payload = Object.entries(data).map(([name, value]) => ({name, value}));
        
        try {
            const response = await axios.patch(`${process.env.REACT_APP_API_URL}/settings`, { 
                settings: payload 
            }, {
                withCredentials: true
            });

            const successMessage = response.data.message;
            successAlert(successMessage);
            
        } catch (error) {
            
            const errorMessage = error.response?.data?.message ?? "Ocurrió un error al actualizar las configuraciones";
            errorAlert(errorMessage);
        }
    };
    
    return (
        <div className="my-5">

            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
                <h2 className="mb-4 mb-md-0">Configuraciones</h2>
            </div>

            <div className="d-flex justify-content-center align-items-center">
                {loadingSettings && <p>Cargando...</p>}
                {error && <p>Ocurrió un error al cargar las configuraciones</p>}
            </div>

            {(!error && !loadingSettings) &&
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3 row">
                        <div className="col">
                            <label className="col-form-label fw-bold">Habilitar Enlace a Formulario Externo</label>
                            <div className="form-text">
                                Al habilitar esta opción se va a mostrar el enlace al
                                formulario externo a los usuarios cuando registren
                                una denuncia exitosamente.
                            </div>
                        </div>
                        <div className="col d-flex align-items-center">
                            <div className="form-check form-switch me-2">
                                <input 
                                    className="form-check-input"
                                    type="checkbox"
                                    id="showExternalFormLink"
                                    {...register("showExternalFormLink")}
                                />
                            </div>
                            <span>{showExternalFormLink ? "habilitado" : "deshabilitado"}</span>
                        </div>
                    </div>

                    <div className="mb-3 row">
                        <div className="col">
                            <label className="col-form-label fw-bold">Enlace al Formulario Externo</label>
                            <div className="form-text">
                                El enlace que coloque en esta campo se mostrará al usuario
                                al registrar una denuncia exitosamente. El enlace solo se va
                                a mostrar si la opción 'Habilitar Enlace a Formulario Externo' está habilitada.
                            </div>
                        </div>
                        <div className="col">
                            <input
                                type="url"
                                className="form-control"
                                id="externalFormLink"
                                {...register("externalFormLink")}
                            />
                        </div>
                    </div>

                    <div className="d-flex justify-content-end mt-5">
                        <button type="submit" className="main-button">
                            Guardar cambios
                        </button>
                    </div>

                </form>
            }

        </div>
    );
}

export default AdminSettings;