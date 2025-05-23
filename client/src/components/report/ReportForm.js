import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Tooltip } from "bootstrap";
import Swal from 'sweetalert2';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ReportForm() {

    // Initialize form handling with react-hook-form
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({ defaultValues: { typeReport: "addictional-information" } });

    // State to handle selected province and conditional fields
    const [selectedProvince, setSelectedProvince] = useState("");
    const [showAdditionalInfo, setShowAdditionalInfo] = useState(true);
    const [descriptionLength, setDescriptionLength] = useState(0);

    const navigate = useNavigate();


    const handleCancelClick = () => {
        navigate("/");
    }; 

    // Function executed when form is submitted
    const onSubmit = async (data) => {

        if(data.typeReport === "anonymous"){
            delete data.email;
            delete data.province;
            delete data.canton;
            delete data.age;
        }
        
        try {

            const response = await axios.post(`${process.env.REACT_APP_API_URL}/report`, data);

            if (response) {

                Swal.fire({
                    title: 'Éxito',
                    text: response?.data?.message,
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
                }).then((result) => {
                    navigate("/");
                });

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
    };

    useEffect(() => {
        const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        tooltips.forEach((tooltip) => new Tooltip(tooltip));
    }, []);


    // Province and cantons mapping
    const provinceData = {
        "San José": ["San José", "Escazú", "Desamparados", "Puriscal", "Tarrazú", "Aserrí", "Mora", "Goicochea", "Santa Ana", "Alajuelita", "Vázquez de Coronado", "Acosta", "Tibás", "Moravia", "Montes de Oca", "Turrubares", "Dota", "Curridabat", "Pérez Zeledón", "León Córtes Castro"],
        "Alajuela": ["Alajuela", "San Ramón", "Grecia", "San Mateo", "Atenas", "Naranjo", "Palmares", "Poás", "Orotina", "San Carlos", "Zarcero", "Sarchí", "Upala", "Los Chiles", "Guatuso", "Río Cuarto"],
        "Cartago": ["Cartago", "Paraíso", "La Unión", "Jiménez", "Turrialba", "Alvarado", "Oreamuno", "El Guarco"],
        "Heredia": ["Heredia", "Barva", "Santo Domingo", "Santa Bárbara", "San Rafael", "San Isidro", "Belén", "Flores", "San Pablo", "Sarapiquí"],
        "Guanacaste": ["Liberia", "Nicoya", "Santa Cruz", "Bagaces", "Carrillo", "Cañas", "Abangares", "Tilarán", "Nandayure", "La Cruz", "Hojancha"],
        "Puntarenas": ["Puntarenas", "Esparza", "Buenos Aires", "Montes de Oro", "Osa", "Quepos", "Golfito", "Coto Brus", "Parrita", "Corredoes", "Garabito", "Monteverde", "Puerto Jiménez"],
        "Limón": ["Limón", "Pococí", "Siquirres", "Talamanca", "Matina", "Guácimo"],
    };

    // Filter cantons based on selected province
    const filteredCantons = selectedProvince ? provinceData[selectedProvince] || [] : [];

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* Form title and subtitle */}
            <h2 className="mb-3">Formulario de Registro de Denuncia</h2>
            <p className="text-muted mb-4">Los campos marcados con * son obligatorios</p>

            {/* Description */}
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

            {/* Radio buttons to select type of report */}
            <div className="d-flex align-items-start gap-4 mb-4">

                <div className="form-check">
                    <input className="form-check-input" type="radio" value="anonymous" {...register("typeReport", { required: true })} onChange={() => setShowAdditionalInfo(false)} />
                    <label className="form-check-label">Denuncia anónima</label>
                </div>

                <div className="form-check">
                    <input className="form-check-input" type="radio" value="addictional-information" {...register("typeReport", { required: true })} onChange={() => setShowAdditionalInfo(true)} />
                    <label className="form-check-label">Denuncia con información adicional</label>
                </div>

                {/* Tooltip icon for additional info */}
                <i className="bi bi-info-circle ms-2" data-bs-toggle="tooltip" data-bs-placement="right" title="Al seleccionar esta opción usted nos ayuda a enriquecer la investigación. Los datos son opcionales"></i>
            </div>

            {/* Additional fields that show conditionally */}
            <div
                className={`${showAdditionalInfo ? "" : "invisible"}`}
            >
                {/* Email input */}
                <div className="mb-4">
                    <label className="form-label">Correo electrónico</label>
                    <input type="email" className="form-control fixed-width-email" {...register("email")} />
                </div>

                <div className="row mb-5">
                    {/* Province selector */}
                    <div className="col-auto me-4 mb-4 mb-lg-0">
                        <label className="form-label">Provincia</label>
                        <select className="form-select fixed-width-select" {...register("province")} onChange={(e) => {setSelectedProvince(e.target.value); setValue("canton", "")}}>
                            <option value="">Seleccione una provincia</option>
                            {Object.keys(provinceData).map((province) => (
                                <option key={province} value={province}>{province}</option>
                            ))}
                        </select>
                    </div>

                    {/* Canton selector */}
                    <div className="col-auto me-4 mb-4 mb-lg-0">
                        <label className="form-label">Cantón</label>
                        <select className="form-select fixed-width-select" {...register("canton")} disabled={!selectedProvince}>
                            <option value="">Seleccione un cantón</option>
                            {filteredCantons.map((canton) => (
                                <option key={canton} value={canton}>{canton}</option>
                            ))}
                        </select>
                    </div>

                    {/* Age range selector */}
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
            </div>

            {/* Buttons */}
            <div className="d-flex justify-content-end mt-5 gap-3">
                <button type="button" onClick={handleCancelClick} className="cancel-button">Cancelar</button>
                <button type="submit" className="main-button">Enviar denuncia</button>
            </div>
        </form>
    );
}

export default ReportForm;
