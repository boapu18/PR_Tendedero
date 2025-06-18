import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Tooltip } from "bootstrap";
import { successAlert, errorAlert } from "../../utils/alertInvokers";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    PROVINCE_DATA,
    GENDER_IDENTITY_DATA,
    AGE_BRACKET_DATA,
    ROLE_IN_INSTITUTION_DATA,
    DEFAULT_ERROR_MESSAGE,
} from "../../utils/constants";

function ReportForm() {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm({ defaultValues: { typeReport: "additional-information" } });

    const [selectedProvince, setSelectedProvince] = useState("");
    const [descriptionLength, setDescriptionLength] = useState(0);
    const typeReport = watch("typeReport");
    const showAdditionalInfo = typeReport === "additional-information";
    const filteredCantons = selectedProvince ? PROVINCE_DATA[selectedProvince] || [] : [];
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
            const registerResponse = await axios.post(
                `${process.env.REACT_APP_API_URL}/report`,
                data
            );

            // Se obtienen las configuraciones para verificar si se debe mostrar en enlace al formulario
            const settingsResponse = await axios.get(`${process.env.REACT_APP_API_URL}/settings`);
            const settings = settingsResponse.data.data.settings;
            const settingsObjs = Object.fromEntries(
                settings.map(({ name, value }) => [name, value])
            );

            let popUpMessage = registerResponse.data.message;

            if (settingsObjs.showExternalFormLink) {
                const linkMessage = `.<br><br>Si desea contribuir con mayor profundidad a las investigaciones de la red AMEC,
                lo invitamos a completar el siguiente formulario: <a href="${settingsObjs.externalFormLink}" target="_blank">Enlace al formulario</a>`;
                popUpMessage += linkMessage;
            }

            successAlert(popUpMessage, settingsObjs.showExternalFormLink, () => {
                navigate("/");
            });
        } catch (error) {
            errorAlert(error.response?.data?.message ?? DEFAULT_ERROR_MESSAGE);
        }
    };

    useEffect(() => {
        const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        tooltips.forEach((tooltip) => new Tooltip(tooltip));
    }, []);

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
                        onChange: (e) => setDescriptionLength(e.target.value.length),
                    })}
                />

                <div className="d-flex justify-content-between mb-2">
                    {errors.description && (
                        <div className="text-danger mt-1">{errors.description.message}</div>
                    )}
                    <div
                        className="ms-auto mt-1"
                        style={{
                            fontSize: "0.9rem",
                            color: descriptionLength > 2000 ? "red" : "#666",
                        }}
                    >
                        {descriptionLength}/2000
                    </div>
                </div>

                <label className="form-label">Rol dentro de la institución *</label>
                <select
                    className="form-select fixed-width-select"
                    {...register("roleInInstitution", {
                        required: "El rol dentro de la institución es obligatorio",
                    })}
                >
                    <option value="">Seleccione</option>
                    {ROLE_IN_INSTITUTION_DATA.map((role) => (
                        <option key={role} value={role}>
                            {role}
                        </option>
                    ))}
                </select>

                <div className="d-flex justify-content-between mb-2">
                    {errors.roleInInstitution && (
                        <div className="text-danger mt-1">{errors.roleInInstitution.message}</div>
                    )}
                </div>
            </div>

            <div className="d-flex align-items-start gap-4 mb-4">
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        value="anonymous"
                        {...register("typeReport", { required: true })}
                    />
                    <label className="form-check-label">Denuncia anónima</label>
                </div>

                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        value="additional-information"
                        {...register("typeReport", { required: true })}
                    />
                    <label className="form-check-label">Denuncia con información adicional</label>
                </div>

                <i
                    className="bi bi-info-circle ms-2"
                    data-bs-toggle="tooltip"
                    data-bs-placement="right"
                    title="Al seleccionar esta opción usted nos ayuda a enriquecer la investigación. Los datos son opcionales"
                ></i>
            </div>

            <div className={`${showAdditionalInfo ? "" : "d-none"}`}>
                <div className="mb-4">
                    <label className="form-label">Correo electrónico</label>
                    <input type="email" className="form-control" {...register("email")} />
                </div>

                <div className="row mb-0 mb-md-4">
                    <div className="col-12 col-lg mb-4 mb-lg-0">
                        <label className="form-label">Provincia</label>
                        <select
                            className="form-select"
                            {...register("province")}
                            onChange={(e) => {
                                setSelectedProvince(e.target.value);
                                setValue("canton", "");
                            }}
                        >
                            <option value="">Seleccione</option>
                            {Object.keys(PROVINCE_DATA).map((province) => (
                                <option key={province} value={province}>
                                    {province}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-12 col-lg mb-4 mb-lg-0">
                        <label className="form-label">Cantón</label>
                        <select
                            className="form-select"
                            {...register("canton")}
                            disabled={!selectedProvince}
                        >
                            <option value="">Seleccione</option>
                            {filteredCantons.map((canton) => (
                                <option key={canton} value={canton}>
                                    {canton}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-12 col-lg mb-4 mb-lg-0">
                        <label className="form-label">Rango de edad</label>
                        <select className="form-select" {...register("age")}>
                            <option value="">Seleccione</option>
                            {AGE_BRACKET_DATA.map((ageRange) => (
                                <option key={ageRange} value={ageRange}>
                                    {ageRange}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-12 col-lg mb-4 mb-lg-0">
                        <label className="form-label">Identidad de género</label>
                        <select className="form-select" {...register("genderIdentity")}>
                            <option value="">Seleccione</option>
                            {GENDER_IDENTITY_DATA.map((gender) => (
                                <option key={gender} value={gender}>
                                    {gender}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-end mt-5 gap-3">
                <button type="button" onClick={handleCancelClick} className="secondary-button">
                    Cancelar
                </button>
                <button type="submit" className="main-button">
                    Enviar denuncia
                </button>
            </div>
        </form>
    );
}

export default ReportForm;
