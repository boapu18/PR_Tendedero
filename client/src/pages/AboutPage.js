import React from "react";
import PurpleBackground from "../components/utils/PurpleBackground";
import BackButton from "../components/utils/BackButton";
import OrganizationData from "../components/utils/OrganizationData";

function AboutPage() {
    return (
        <PurpleBackground>
            <div className="container py-4">
                <div className="p-1 p-md-5 m-0 m-md-2 rounded-0 shadow-none rounded-4 shadow bg-white">
                    <div className="d-flex mb-2 gap-1 align-items-center">
                        <BackButton backTo={"/"} />
                        <h1>Acerca del Tendedero Virtual de Denuncia</h1>
                    </div>
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

                    <h2>Justificación</h2>

                    <p>
                        La visibilización de los casos de acoso y violencia en entornos
                        universitarios es fundamental para fomentar una cultura de denuncia y
                        promover acciones institucionales que garanticen espacios seguros. En junio
                        de 2024, la Red AMEC de la UNED implementó un tendedero físico de denuncia
                        anónima como parte de las actividades del II Encuentro de Ciencia y Género;
                        sin embargo, este mecanismo presentaba limitaciones que afectaban su alcance
                        y funcionalidad.
                    </p>
                    <p>
                        El desarrollo de una plataforma de denuncia digital permitiría a la
                        comunidad universitaria denunciar y exponer casos de acoso o violencia de
                        manera anónima y accesible desde cualquier parte del país. Además, esta
                        plataforma, al facilitar el seguimiento de denuncias y la obtención de datos
                        demográficos, serviría para generar estadísticas relevantes que puedan ser
                        utilizadas en la creación de estrategias institucionales para la prevención
                        y atención de estos casos.
                    </p>
                    <p>
                        Este proyecto contribuiría significativamente a la democratización del
                        acceso a mecanismos de denuncia, y al fortalecimiento y visibilización de la
                        lucha contra el acoso y violencia en el entorno universitario de las
                        diversas sedes de la UNED.
                    </p>
                    <OrganizationData />
                </div>
            </div>
        </PurpleBackground>
    );
}

export default AboutPage;
