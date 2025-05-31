import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Tooltip } from "bootstrap";
import { successAlert, errorAlert } from "../../utils/alertInvokers";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ReportForm() {

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({ defaultValues: { typeReport: "addictional-information" } });

    const [selectedProvince, setSelectedProvince] = useState("");
    const [descriptionLength, setDescriptionLength] = useState(0);
    const typeReport = watch("typeReport");
    const showAdditionalInfo = typeReport === "addictional-information";

    const navigate = useNavigate();

    const handleCancelClick = () => {
        navigate("/");
    };

    const onSubmit = async (data) => {

        if (data.typeReport === "anonymous") {
            delete data.email;
            delete data.province;
            delete data.canton;
            delete data.age;
            delete data.genderIdentity;
        }

        try {

            const registerResponse = await axios.post(`${process.env.REACT_APP_API_URL}/report`, data);
                
            // Se obtienen las configuraciones para verificar si se debe mostrar en enlace al formulario
            const settingsResponse = await axios.get(`${process.env.REACT_APP_API_URL}/settings`);
            const settings = settingsResponse.data.data.settings;
            const settingsObjs = Object.fromEntries(settings.map(({ name, value }) => [name, value]));

            let popUpMessage = registerResponse.data.message;

            if (settingsObjs.showExternalFormLink){
                const linkMessage = `.<br><br>Si desea contribuir con mayor profundidad a las investigaciones de la red AMEC,
                lo invitamos a completar el siguiente formulario: <a href="${settingsObjs.externalFormLink}" target="_blank">Enlace al formulario</a>`;
                popUpMessage += linkMessage;
            }

            successAlert(popUpMessage, settingsObjs.showExternalFormLink, () => { navigate("/"); });

        } catch (error) {

            const errorMessage = error.response?.data?.message ?? "Se produjo un error inesperado, intente nuevamente más tarde";
            errorAlert(errorMessage);
        }
    };

    useEffect(() => {
        const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        tooltips.forEach((tooltip) => new Tooltip(tooltip));
    }, []);

    const provinceData = {
        "San José": ["San José", "Escazú", "Desamparados", "Puriscal", "Tarrazú", "Aserrí", "Mora", "Goicochea", "Santa Ana", "Alajuelita", "Vázquez de Coronado", "Acosta", "Tibás", "Moravia", "Montes de Oca", "Turrubares", "Dota", "Curridabat", "Pérez Zeledón", "León Córtes Castro"],
        "Alajuela": ["Alajuela", "San Ramón", "Grecia", "San Mateo", "Atenas", "Naranjo", "Palmares", "Poás", "Orotina", "San Carlos", "Zarcero", "Sarchí", "Upala", "Los Chiles", "Guatuso", "Río Cuarto"],
        "Cartago": ["Cartago", "Paraíso", "La Unión", "Jiménez", "Turrialba", "Alvarado", "Oreamuno", "El Guarco"],
        "Heredia": ["Heredia", "Barva", "Santo Domingo", "Santa Bárbara", "San Rafael", "San Isidro", "Belén", "Flores", "San Pablo", "Sarapiquí"],
        "Guanacaste": ["Liberia", "Nicoya", "Santa Cruz", "Bagaces", "Carrillo", "Cañas", "Abangares", "Tilarán", "Nandayure", "La Cruz", "Hojancha"],
        "Puntarenas": ["Puntarenas", "Esparza", "Buenos Aires", "Montes de Oro", "Osa", "Quepos", "Golfito", "Coto Brus", "Parrita", "Corredoes", "Garabito", "Monteverde", "Puerto Jiménez"],
        "Limón": ["Limón", "Pococí", "Siquirres", "Talamanca", "Matina", "Guácimo"],
    };

    const filteredCantons = selectedProvince ? provinceData[selectedProvince] || [] : [];

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <h2 className="mb-3">Formulario de Registro de Denuncia</h2>
            <p className="text-muted mb-4">Los campos marcados con * son obligatorios</p>

            <div className="mb-4">
                <label className="form-label">Descripción *</label>
                <textarea
                    className="form-control"
                    rows={4}
                    maxLength={2000}
                    {...register("description", {
                        required: "La descripción es obligatoria",
                        onChange: (e) => setDescriptionLength(e.target.value.length)
                    })}
                />
                <div className="text-end mt-1" style={{ fontSize: "0.9rem", color: descriptionLength >= 2000 ? "red" : "#666" }}>
                    {descriptionLength}/2000
                </div>
                {errors.description && <div className="text-danger mt-1">{errors.description.message}</div>}
            </div>

            <div className="d-flex align-items-start gap-4 mb-4">

                <div className="form-check">
                    <input className="form-check-input" type="radio" value="anonymous" {...register("typeReport", { required: true })} />
                    <label className="form-check-label">Denuncia anónima</label>
                </div>

                <div className="form-check">
                    <input className="form-check-input" type="radio" value="addictional-information" {...register("typeReport", { required: true })} />
                    <label className="form-check-label">Denuncia con información adicional</label>
                </div>

                <i className="bi bi-info-circle ms-2" data-bs-toggle="tooltip" data-bs-placement="right" title="Al seleccionar esta opción usted nos ayuda a enriquecer la investigación. Los datos son opcionales"></i>
            </div>

            <div
                className={`${showAdditionalInfo ? "" : "d-none"}`}
            >

                <div className="mb-4">
                    <label className="form-label">Correo electrónico</label>
                    <input type="email" className="form-control fixed-width-email" {...register("email")} />
                </div>

                <div className="row mb-0 mb-md-4">

                    <div className="col-auto me-4 mb-4 mb-lg-0">
                        <label className="form-label">Provincia</label>
                        <select className="form-select fixed-width-select" {...register("province")} onChange={(e) => { setSelectedProvince(e.target.value); setValue("canton", "") }}>
                            <option value="">Seleccione una provincia</option>
                            {Object.keys(provinceData).map((province) => (
                                <option key={province} value={province}>{province}</option>
                            ))}
                        </select>
                    </div>

                    <div className="col-auto me-4 mb-4 mb-lg-0">
                        <label className="form-label">Cantón</label>
                        <select className="form-select fixed-width-select" {...register("canton")} disabled={!selectedProvince}>
                            <option value="">Seleccione un cantón</option>
                            {filteredCantons.map((canton) => (
                                <option key={canton} value={canton}>{canton}</option>
                            ))}
                        </select>
                    </div>

                    <div className="col-auto me-4 mb-4 mb-lg-0">
                        <label className="form-label">Rango de edad</label>
                        <select className="form-select fixed-width-select" {...register("age")}>
                            <option value="">Seleccione</option>
                            <option value="Menos de 18 años">Menos de 18 años</option>
                            <option value="18-24 años">18-24 años</option>
                            <option value="25-34 años">25-34 años</option>
                            <option value="45-54 años">45-54 años</option>
                            <option value="55-64 años">55-64 años</option>
                            <option value="65 años o más">65 años o más</option>
                        </select>
                    </div>
                </div>

                <div className="row mb-5">

                    <div className="col-auto me-4 mb-4 mb-lg-0">
                        <label className="form-label">Identidad de género</label>
                        <select className="form-select fixed-width-select" {...register("genderIdentity")}>
                            <option value="">Seleccione</option>
                            <option value="Mujer">Mujer</option>
                            <option value="Hombre">Hombre</option>
                            <option value="Mujer trans">Mujer trans</option>
                            <option value="Hombre trans">Hombre trans</option>
                            <option value="Persona no binaria">Persona no binaria</option>
                            <option value="Persona de género fluido">Persona de género fluido</option>
                            <option value="Persona agénero">Persona agénero</option>
                            <option value="Otro">Otro</option>
                        </select>
                    </div>

                    <div className="col-auto me-4 mb-4 mb-lg-0">
                        <label className="form-label">Rol dentro de la institución</label>
                        <select className="form-select fixed-width-select" {...register("roleInInstitution")}>
                            <option value="">Seleccione</option>
                            <option value="Persona estudiante">Persona estudiante</option>
                            <option value="Persona docente">Persona docente</option>
                            <option value="Persona administrativa">Persona administrativa</option>
                            <option value="Otro">Otro</option>
                        </select>
                    </div>
                </div>

            </div>

            <div className="d-flex justify-content-end mt-5 gap-3">
                <button type="button" onClick={handleCancelClick} className="cancel-button">Cancelar</button>
                <button type="submit" className="main-button">Enviar denuncia</button>
            </div>

        </form>
    );
}

export default ReportForm;
