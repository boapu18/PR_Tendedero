import React from "react";
import axios from "axios";
import { errorAlert } from "../../utils/alertInvokers";
import { DEFAULT_ERROR_MESSAGE } from "../../utils/constants";

const handleExportDataButtonClick = async () => {

  try {
    
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/reports/download-csv`, {
      responseType: 'blob',
      withCredentials: true
    });
  
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Reportes.csv');
    document.body.appendChild(link);
    link.click();
    link.remove();
    
  } catch (e){
    errorAlert(e.response?.data?.message ?? DEFAULT_ERROR_MESSAGE);
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