import React from "react";
import PurpleBackground from "../components/utils/PurpleBackground";
import BackButton from "../components/utils/BackButton";
import OrganizationData from "../components/utils/OrganizationData";

function AboutPage() {
    return (
        <PurpleBackground>
            <div className="container py-4">
                <div className="p-1 p-md-5 m-0 m-md-2 rounded-0 shadow-none rounded-4 shadow bg-white">
                    <div className="mb-4">
                        <BackButton backTo={"/"} />
                    </div>
                    <h1>Acerca del Tendedero Virtual de Denuncia</h1>
                    <p>
                        El Tendedero Virtual de Denuncia fue un proyecto desarrollado como parte del
                        curso Proyecto de Ingeniería de Software para la carrera de Ingeniería en
                        Computación en el Instituto Tecnológico de Costa Rica. El proyecto fue
                        desarrollado en el primer semestre de 2025 por los estudiantes:
                    </p>
                    <ul>
                        <li>Ariana Alvarado Molina.</li>
                        <li>María Paula Bolaños Apú.</li>
                        <li>Marco Herrera González.</li>
                    </ul>
                    <p>
                        El proyecto contó con la supervisión de Adriana Lucía Céspedes Vindas,
                        investigadora en el Laboratorio de Investigación e Innovación Tecnológica
                        (LIIT) de la Universidad Estatal a Distancia (UNED).
                    </p>
                    <OrganizationData />
                </div>
            </div>
        </PurpleBackground>
    );
}

export default AboutPage;
