import React from "react";
import { useNavigate } from "react-router-dom";

function Terms() {
    const navigate = useNavigate();

    const handleAcceptClick = () => {
        localStorage.setItem("tendedero-terms-of-use-accepted", true);
        navigate("/");
    };

    return (
        <>
            <h2>Tendedero Virtual de Denuncia</h2>

            <p>
                Bienvenid@ al Tendedero de Denuncias, un espacio seguro donde puede compartir de
                manera anónima experiencias de acoso o violencia. Nuestro objetivo es visibilizar
                estas situaciones y generar datos que contribuyan a la investigación del grupo{" "}
                <b>Red Abierta de Mujeres en Ciencia.</b>
            </p>

            <h3>Descripción</h3>

            <p>
                El tendedero de denuncia es una obra de expresión artística que utiliza la denuncia
                como vehículo creativo, esta manifestación popular de base feminista fue creada por
                la pionera del arte feminista Mónica Mayer (Mayer y Lerma 2022).
            </p>

            <p>
                Esta manifestación artística que busca visibilizar la opresión que enfrentan las
                mujeres, especialmente en los ámbitos académico y científico, reflejando las
                experiencias y emociones de las personas que han vivido situaciones de
                hostigamiento, maltrato o acoso en su diario vivir pero que, por miedo a represalias
                o para evitar la exposición, no denuncian a los agresores.
            </p>

            <h3>Consentimiento Informado para Participación en el Tendedero Virtual</h3>

            <p>
                La Red Abierta de Mujeres en Ciencias (Red AMEC) es un colectivo feminista de la
                Universidad Estatal a Distancia, que propicia espacios de reflexión y acción para
                fomentar la igualdad y equidad de género en los procesos docentes, de investigación
                y extensión en el área de ciencias mediante la articulación de esfuerzos grupales,
                con la finalidad de integrar a la comunidad universitaria y facilitar la vinculación
                de las personas que trabajan en la temática.
            </p>

            <p>
                La Red AMEC busca ahondar en la comprensión de la relevancia del origen histórico de
                las ciencias en las dinámicas de exclusión e invisibilizarían, así como, la
                importancia de la reflexión crítica sobre la epistemología y ética de la ciencia,
                desde perspectivas filosóficas con fines de inclusión y justicia social.
            </p>

            <p>
                <b>
                    <u>Propósito del estudio:</u>
                </b>{" "}
                el análisis tendrá como objetivo sistematizar las experiencias de las personas
                participantes en el tendedero con relación a situaciones de desigualdad de género en
                el ámbito académico y científico en la UNED.
            </p>

            <p>
                Los resultados serán utilizados para generar informes y recomendaciones que puedan
                contribuir al desarrollo de un entorno más inclusivo y equitativo en la institución.
            </p>

            <p>
                <b>
                    <u>Uso de la Información:</u>
                </b>{" "}
                La información será utilizada exclusivamente con fines de investigación y
                divulgación académica. Los hallazgos serán presentados en informes, publicaciones
                académicas y presentaciones en eventos relacionados con género y ciencia.
            </p>

            <p>
                Los datos serán manejados por el equipo de investigación responsable del análisis,
                respetando los principios éticos de confidencialidad y protección de la identidad.
            </p>

            <p>
                <b>
                    <u>Participación Voluntaria y Derecho de Retiro:</u>
                </b>{" "}
                La participación en este proyecto es completamente voluntaria. Usted puede decidir
                no participar o retirarse en cualquier momento sin ninguna repercusión.
            </p>

            <p>
                En caso de que cualquier participante desee más información sobre el uso de los
                datos puede comunicarse con el equipo organizador del encuentro para expresar su
                solicitud, para ello puede escribir al correo: redamec@uned.ac.cr
            </p>

            <p>
                <b>
                    <u>Posibles Beneficios y Riesgos:</u>
                </b>
            </p>

            <p>
                Beneficios: Su respuesta contribuirá a visibilizar las experiencias relacionadas con
                el género en la ciencia a lo interno de la UNED, permitiendo proponer acciones que
                prevengan y mitiguen la desigualdad de género.
            </p>

            <p>
                Riesgos: No se identifican riesgos directos para las mujeres participantes, sin
                embargo, los contenidos pueden generar sensibilidad en la propia persona o en
                personas que se identifiquen con situaciones similares.
            </p>

            <p>
                <b>
                    <u>Contacto:</u>
                </b>{" "}
                Si tienes alguna duda o inquietud sobre esta sistematización de experiencias, o si
                deseas obtener más información sobre los resultados, puedes comunicarte con las
                personas miembros de la Red AMEC:
            </p>

            <ul>
                <li>Ariana Acón Matamoros / aaconm@uned.ac.cr / Tel: 2202-1825</li>
                <li>Evelyn Alfaro Vargas / ealfarov@uned.ac.cr</li>
                <li>Katya Bermúdez Campos / kbermudezc@uned.ac.cr / Tel: 202-1821</li>
                <li>Yency Calderón Badilla / ycalderon@uned.ac.cr</li>
                <li>Melissa Céspedes Alvarado / mcespedesa@uned.ac.cr</li>
                <li>Diana Herrero Villarreal / dvillarreal@uned.ac.cr / Tel: 2202-1815</li>
                <li>Pamela Víquez Araya / pviquez@uned.ac.cr</li>
            </ul>

            <p>
                <b>
                    <u>Aceptación del Consentimiento:</u>
                </b>{" "}
                Al participar en este proyecto, usted declara que ha leído y comprendido la
                información proporcionada, y que acepta voluntariamente participar en el 'Tendedero
                Virtual' organizado por la Red Abierta de Mujeres en Ciencias.
            </p>

            <div className="d-flex justify-content-center mt-5">
                <button className="main-button" onClick={handleAcceptClick}>
                    Acepto
                </button>
            </div>
        </>
    );
}

export default Terms;
