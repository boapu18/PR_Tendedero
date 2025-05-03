import React from "react";
import axios from "axios";

const handleExportDataButtonClick = async () => {
  try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/download_csv`, {
            responseType: "blob",
        });
    
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "Reportes.csv");
        document.body.appendChild(link);
        link.click();
        }
        catch (error) {
            console.error("Error al descargar el archivo CSV:", error);
            alert("Error al descargar el archivo CSV");
        }
    };

function ExportDataButton() {
  return (
    <button className="main-button" onClick={handleExportDataButtonClick}>
      Exportar datos
    </button>
  );
}

export default ExportDataButton;