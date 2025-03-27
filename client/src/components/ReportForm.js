import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Tooltip } from "bootstrap";
import Swal from 'sweetalert2';
import axios from "axios";

function ReportForm() {

    // Initialize form handling with react-hook-form
    const {register, handleSubmit, formState: { errors }} = useForm({defaultValues: {typeReport: "anonymous"}});

    // State to handle selected province and conditional fields
    const [selectedProvince, setSelectedProvince] = useState("");
    const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);

    // Function executed when form is submitted
    const onSubmit = async (data) => {
        
        console.log("Datos enviados:", data);
        
        try {
            
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/report`, data);
            
            Swal.fire({
                title: 'Éxito',
                text: response.data.message,
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

        } catch (error) {
            
            Swal.fire({
                title: 'Error del servidor',
                text: error.response?.data?.message,
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    };
    
    useEffect(() => {
        const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        tooltips.forEach((tooltip) => new Tooltip(tooltip));
    }, []);

    useEffect(() => {
        setShowAdditionalInfo(false);
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
        <div className="container py-5">
            {/* Main card container for the form */}
            <div className="bg-white shadow rounded-4 p-5">
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Form title and subtitle */}
                    <h2 className="mb-3">Formulario de Registro de Denuncia</h2>
                    <p className="text-muted mb-4">Los campos marcados con * son obligatorios</p>

                    {/* Description */}
                    <div className="mb-4">
                        <label className="form-label">Descripción *</label>
                        <textarea className="form-control" rows={4} {...register("description", { required: "La descripción es obligatoria" })} />
                        {errors.description && <div className="text-danger mt-1">{errors.description.message}</div>}
                    </div>

                    {/* Radio buttons to select type of report */}
                    <div className="d-flex align-items-center gap-4 mb-4">
                        <div className="form-check">
                            <input className="form-check-input" type="radio" value="anonymous" {...register("typeReport", { required: true })} onChange={() => setShowAdditionalInfo(false)} />
                            <label className="form-check-label">Denuncia anónima</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" value="addictional-information" {...register("typeReport", { required: true })} onChange={() => setShowAdditionalInfo(true)} />
                            <label className="form-check-label">Denuncia con información adicional</label>
                        </div>
                        {/* Tooltip icon for additional info */}
                        <i className="bi bi-info-circle ms-2" data-bs-toggle="tooltip" data-bs-placement="right" title="Incluye tu correo y edad para más contexto."></i>
                    </div>

                    {/* Additional fields that show conditionally */}
                    <div
                        className={`transition-opacity ${showAdditionalInfo ? "opacity-100 visible" : "opacity-0 invisible"}`}
                        style={{ minHeight: "200px", transition: "opacity 0.5s ease" }}
                    >
                        {/* Email input */}
                        <div className="mb-4">
                            <label className="form-label">Correo electrónico</label>
                            <input type="email" className="form-control w-50" {...register("email")} />
                        </div>

                        <div className="row mb-5">
                            {/* Province selector */}
                            <div className="col-auto me-5">
                                <label className="form-label">Provincia</label>
                                <select className="form-select fixed-width-select" {...register("province")} onChange={(e) => setSelectedProvince(e.target.value)}>
                                    <option value="">Seleccione una provincia</option>
                                    {Object.keys(provinceData).map((province) => (
                                        <option key={province} value={province}>{province}</option>
                                    ))}
                                </select>
                            </div>
                            
                            {/* Canton selector */}
                            <div className="col-auto me-5">
                                <label className="form-label">Cantón</label>
                                <select className="form-select fixed-width-select" {...register("canton")} disabled={!selectedProvince}>
                                    <option value="">Seleccione un cantón</option>
                                    {filteredCantons.map((canton) => (
                                        <option key={canton} value={canton}>{canton}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Age range selector */}
                            <div className="col-auto me-5">
                                <label className="form-label">Rango de edad</label>
                                <select className="form-select fixed-width-select" {...register("age")}>
                                    <option value="">Seleccione</option>
                                    <option value="16-25">16-25</option>
                                    <option value="26-35">26-35</option>
                                    <option value="36+">36+</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="button-group d-flex justify-content-end gap-2">
                        <button type="button" className="cancel-button">Cancelar</button>
                        <button type="submit" className="main-button">Enviar denuncia</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ReportForm;
