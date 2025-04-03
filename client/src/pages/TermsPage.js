import React from 'react';
import PurpleBackground from "../components/PurpleBackground";
import { useNavigate } from 'react-router-dom';

function TermsPage(){

    const navigate = useNavigate();

    const handleAcceptClick = () => {
        localStorage.setItem("tendedero-terms-of-use-accepted", true);
        navigate("/");
    };

    return(
        <PurpleBackground>
            <div className="container py-4">
                <div className="bg-white shadow rounded-4 p-5 m-2">
                    
                    <h1>Términos de Uso del Tendedero de Denuncias</h1>
                    
                    <p>Bienvenid@ al Tendedero de Denuncias, un espacio seguro donde puede compartir de manera anónima 
                    experiencias de acoso o violencia. Nuestro objetivo es visibilizar estas situaciones y generar datos 
                    que contribuyan a la investigación del grupo <b>Red Abierta de Mujeres en Ciencia</b>.</p>

                    <h2>¿Cómo funciona?</h2>

                    <ul>
                        <li>Puede publicar de forma anónima una tarjeta con su testimonio.</li>
                        <li>Opcionalmente, puede incluir datos como su rango de edad, región o correo electrónico si desea ser contactad@.</li>
                        <li>Toda la información adicional (como edad o región) será utilizada únicamente por el equipo investigador y nunca será visible públicamente.</li>
                        <li>Todas las publicaciones pasan por un proceso de revisión para garantizar que se mantenga un lenguaje adecuado y respetuoso.</li>
                    </ul>

                    <h2>Uso de la información</h2>


                    <ul>
                        <li>La información compartida en el sitio será utilizada exclusivamente con fines de investigación y análisis por la <b>Red Abierta de Mujeres en Ciencia</b>.</li>
                        <li>No se almacenarán datos personales sin consentimiento ni se utilizarán con fines comerciales.</li>
                        <li>Los testimonios se publicarán de forma anónima, sin rastreo de identidad.</li>
                    </ul>


                    <h2>Normas de convivencia</h2>

                    <p>Para mantener este espacio seguro y respetuoso:</p>

                    <p>✅ Usa un lenguaje claro y sin insultos.</p>
                    <p>✅ Comparte únicamente experiencias reales y relevantes.</p>
                    <p>✅ No publique información personal de terceros.</p>
                    
                    <p>Nos reservamos el derecho de moderar o eliminar contenido que incumpla estas normas.</p>

                    <h2>Aceptación de los términos</h2>

                    <p>Al dar clic en "Acepto", confirmas que estás de acuerdo con estos términos de uso y 
                        autorizas que la información provista sea utilizada en investigaciones de la <b>Red Abierta de Mujeres en Ciencia</b>.</p>

                    <p>Gracias por ser parte de este esfuerzo para hacer visibles estas realidades. Su voz es importante. 💜</p>

                    <div className="d-flex justify-content-center mt-5">
                        <button className="main-button" onClick={handleAcceptClick}>Acepto</button>
                    </div>
                </div>
            </div>
        </PurpleBackground>
    );
}

export default TermsPage;